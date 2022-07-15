export function headerCreater(): HTMLElement {
  const header = document.createElement('header');

  return header;
}

export function mainCreater(elements: HTMLElement[]): HTMLElement {
  const main = document.createElement('main');

  main.append(...elements);

  return main;
}

export function footerCreater(): HTMLElement {
  const footer = document.createElement('footer');

  return footer;
}
