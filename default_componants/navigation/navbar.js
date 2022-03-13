import build from '../../component.js';
import Link from '../links/link.js';

export default function Navbar({ brand } = {}) {
  return build(
    'nav',
    {
      attributes: {
        class: 'top-nav',
      },
      children: [Brand({ brand })],
    },
    {
      main: `{
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        height: 90px;
        width: 100vw;
        padding: 20px;
        background-color: red;
        box-shadow: 0 0 10px black;
    }`,
    }
  );
}

function Brand({ brand } = {}) {
  const brandLinkSetup = {
    attributes: {
      class: 'top-nav-brand-link lemmns',
      href: '/',
    },
    styles: {
      main: `{
            font-size: 1.8rem;
            color: white;
        }`,
    },
  };

  if (typeof brand === 'string') {
    brandLinkSetup.text = brand;
  } else if (brand instanceof HTMLElement) {
    brandLinkSetup.children = [brand];
  }

  return build('div', {
    attributes: {
      class: 'top-nav-brand-container',
    },
    children: [Link(brandLinkSetup)],
  });
}
