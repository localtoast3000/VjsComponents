class CssUtil {
  camelCaseJsPropToCssPropSyntax(str) {
    for (let char of str) {
      if (char === char.toUpperCase()) {
        str = str.replace(char, `-${char.toLowerCase()}`);
      }
    }
    return str;
  }
  styleObjToInlineStyles(styleObj) {
    let inlineStyles = '';

    for (let key in styleObj) {
      inlineStyles += `${this.camelCaseJsPropToCssPropSyntax(key)}: ${styleObj[key]}; `;
    }

    return inlineStyles;
  }

  appendStylesToDocumentHead(styleString) {
    const head = document.querySelector('head');
    let style = document.querySelector('style');

    if (style === null) {
      style = document.createElement('style');
      style.textContent = styleString;
      head.appendChild(style);
      return;
    }

    if (this.selectorsAreUnique(styleString)) {
      style.textContent += styleString;
    }
    return;
  }

  selectorsAreUnique(styleString) {
    let currentStyles = document.querySelector('style');
    if (currentStyles === null) {
      return true;
    }

    let currentSelectors = this.getSelectors(currentStyles.textContent);
    let newSelectors = this.getSelectors(styleString);
    for (let selector of newSelectors) {
      if (currentSelectors.includes(selector)) {
        return false;
      }
    }
    return true;
  }

  getSelectors(styleString) {
    let selectors = [];
    for (let line of styleString.split('\n')) {
      if (line.includes('{')) {
        selectors = [...selectors, line.split('{').join('').trim()];
      }
    }
    return selectors;
  }

  blueprintSelector(element) {
    return `.${element.classList[0]}`;
  }

  componentSelector(element) {
    return `.overides-${element.classList[0]}`;
  }

  setComponentStyles(selector, styles) {
    let styleString = ``;
    for (let key of Object.keys(styles)) {
      if (key === 'main') {
        styleString += `${selector}${styles[key]}`;
      } else if (key.includes(':')) {
        styleString += `${selector}${key}${styles[key]}`;
      }
    }
    styleString = styleString.split('}').join('}\n');
    this.appendStylesToDocumentHead(this.removeUndefinedStyles(styleString));
  }

  blueprintStyles(element, styles) {
    const selector = this.blueprintSelector(element);
    this.setComponentStyles(selector, styles);
  }

  componentStyles(element, styles) {
    const selector = this.componentSelector(element);
    this.setComponentStyles(selector, styles);
  }

  splitStyles(styleString) {
    let lines = styleString.trim().split('\n');
    let blocks = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('{')) {
        let block = [];
        for (let j = i; j < lines.length; j++) {
          block = [...block, lines[j]];
          if (lines[j].includes('}')) {
            break;
          }
        }
        blocks = [...blocks, block];
      }
    }
    return blocks;
  }

  removeUndefinedStyles(styleString) {
    let blocks = this.splitStyles(styleString);
    for (let block of blocks) {
      let styleCount = 0;
      let blankCount = 0;
      for (let line of block) {
        line = line.trim();
        if (line === 'undefined' || line === undefined || !/./.test(line)) {
          blankCount += 1;
        } else if (!line.includes('{') && !line.includes('}')) {
          styleCount += 1;
        }
      }
      if (blankCount > 0 && styleCount === 0) {
        styleString = styleString.replace(block.join('\n'), '');
      }
    }

    return styleString;
  }
}

export default new CssUtil();
