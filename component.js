import hash from './util/hash_util/hash_util.js';
import css from './util/css_util.js';

/**
 * @module Component - For creating HTML componants
 */

class Component {
  /**
   *
   * @param { string } tagName Represents the HTML tag name that the component will be based on in the document
   * @param { object } props Can contain component attributes, children, events, overide styles and inner text content
   * @param { object } props.attributes Key value pairs of component attributes, all attributes must be valid HTML element attributes as they are directly transferd to the base HTML element
   * @param { string } props.attributes.class All class names will have a hash attached to prevent clashes. If no class name is given then the class attribute will be set to the tag name with a hash added
   * @param { any } props.attributes.any A valid HTML element attribute
   * @param { Array <HTMLElement> } props.children An array of HTMLElement instances to be passed as the children of this component
   * @param { object } props.events An object of property set to the events name and its handler as the value
   * @param { object } props.styles Style overides
   * - Use the "main" property name to define the components main styles
   * - Set the value as a string starting with the opening curly braces, then the styles, then closing curly braces
   * - For pseudo selectors, set the property name as a string of the pseudo selector with its preceding colons eg '::after': '{ content: "" }'
   * @param { string } props.text Sets the textContent of the component
   * @param { string } styleBlueprint Components base styles
   * - Use the "main" property name to define the components main styles
   * - Set the value as a string starting with the opening curly braces, then the styles, then closing curly braces
   * - For pseudo selectors, set the property name as a string of the pseudo selector with its preceding colons eg '::after': '{ content: "" }'
   */

  constructor(tagName, props, styleBlueprint) {
    this.component = this.create(tagName, props, styleBlueprint);
  }

  create(tagName, props, styleBlueprint) {
    const component = document.createElement(tagName);
    const classHash = hash.md5(props.attributes.class ? props.attributes.class.split(' ')[0] : tagName + Math.random());

    try {
      props.attributes.class = props.attributes.class
        .split(' ')
        .map((x) => (x = `${x}-${classHash}`))
        .join(' ');
    } catch {
      props.attributes.class = [
        `${props.attributes.class ? props.attributes.class.split(' ')[0] : tagName}-${classHash}`,
      ];
    }

    this.setAttributes(component, props.attributes);

    if (props.text) {
      component.textContent = props.text;
    }
    if (props.events) {
      this.setEvents(component, props.events);
    }
    if (props.children) {
      this.addChildren(component, props.children);
    }
    if (styleBlueprint) {
      css.blueprintStyles(component, styleBlueprint);
    }
    if (props.styles) {
      css.componentStyles(component, props.styles);
    }
    return component;
  }

  addChildren(element, children) {
    if (children) {
      for (let child of children) {
        element.appendChild(child);
      }
    }
  }

  setAttributes(element, attributes) {
    for (let key of Object.keys(attributes)) {
      element.setAttribute(key, attributes[key]);
    }
  }

  setEvents(element, events) {
    for (let key of Object.keys(events)) {
      if (!key.includes('on')) {
        throw new Error('Invalid event type, must be prefixed with on eg. onclick');
      }
      element[key] = events[key];
    }
  }
}

/**
 * @function build - Builds a HTML element with all attributes, event handlers and styles set to define a UI component
 *
 * @param { string } tagName Represents the HTML tag name that the component will be based on in the document
 * @param { object } props Can contain component attributes, children, events, overide styles and inner text content
 * @param { object } props.attributes Key value pairs of component attributes, all attributes must be valid HTML element attributes as they are directly transferd to the base HTML element
 * @param { string } props.attributes.class All class names will have a hash attached to prevent clashes. If no class name is given then the class attribute will be set to the tag name with a hash added
 * @param { any } props.attributes.any A valid HTML element attribute
 * @param { Array <HTMLElement> } props.children An array of HTMLElement instances to be passed as the children of this component
 * @param { object } props.events An object of property set to the events name and its handler as the value
 * @param { object } props.styles Style overides
 * - Use the "main" property name to define the components main styles
 * - Set the value as a string starting with the opening curly braces, then the styles, then closing curly braces
 * - For pseudo selectors, set the property name as a string of the pseudo selector with its preceding colons eg '::after': '{ content: "" }'
 * @param { string } props.text Sets the textContent of the component
 * @param { string } styleBlueprint Components base styles
 * - Use the "main" property name to define the components main styles
 * - Set the value as a string starting with the opening curly braces, then the styles, then closing curly braces
 * - For pseudo selectors, set the property name as a string of the pseudo selector with its preceding colons eg '::after': '{ content: "" }'
 * @returns An instance of HTMLElement describing the UI component
 */

export default function build(tagName, props, styleBlueprint) {
  const instance = new Component(tagName, props, styleBlueprint);
  return instance.component;
}
