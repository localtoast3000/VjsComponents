import build from '../../component.js';

export default function Link({ ...props } = {}) {
  return build('a', props, {
    main: `{
          text-decoration: none;
    }
          `,
  });
}
