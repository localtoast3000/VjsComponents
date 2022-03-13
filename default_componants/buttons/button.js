import { build } from '../../VjsComponents.js';

export default function Button({ ...props } = {}) {
  return build('button', props, {
    main: `{
        height: 40px;
        width: 100px; 
        border: none;
        border-radius: 5px;
        outline: none;
        background-color: #4285f4;
        color: white;
        margin: 30px;
        box-shadow: 0 3px 2px #1d57b4;
        font-weight: 600;
        transition: background-color 0.5s ease-in-out;
        cursor: pointer;
    }`,
    ':hover': `{
        background-color: #7eaaf0;
      }`,
    ':active': `{
        background-color: #7eaaf0;
        box-shadow: 0 1px 2px #1d57b4;
      }`,
  });
}
