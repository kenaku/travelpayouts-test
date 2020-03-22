const STYLE = 'style';

const applyStyle = (node: HTMLElement, styles: string) => {
  node.style.cssText = styles;
  return node;
};

export const h = (
  name: string,
  attributes: { [key: string]: string } | null,
  ...children: Array<string | Element>
): HTMLElement => {
  console.log(name, attributes, children);

  const el = document.createElement(name);
  if (attributes) {
    for (const name in attributes) {
      const value = attributes[name];
      if (name === STYLE) {
        applyStyle(el, value);
      } else if (value !== null) {
        el.setAttribute(name, value);
      }
    }
  }
  for (let child of children) {
    if (typeof child === 'string') {
      el.innerText = child;
    } else {
      el.appendChild(child);
    }
  }
  return el;
};
