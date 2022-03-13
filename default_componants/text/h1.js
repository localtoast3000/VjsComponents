import { build } from '../../VjsComponents.js';

export default function H1({ ...props } = {}) {
  return build('h1', props, {
    main: `{
      font-size: 4rem;
    }`,
  });
}
