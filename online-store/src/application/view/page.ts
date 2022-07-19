import { cartCreater, controlPanelElemet } from '../controller/controller';

export function headerCreater(): HTMLElement {
  const header = document.createElement('header');
  header.classList.add('header');

  const storeTitle = document.createElement('h1');
  storeTitle.classList.add('store-title');
  storeTitle.innerHTML = 'CPU Store';

  const cart = cartCreater();

  header.append(storeTitle, cart);

  return header;
}

export function mainCreater(productsWrapper: HTMLElement): HTMLElement {
  const main = document.createElement('main');
  main.classList.add('main');

  const controlPanel = controlPanelElemet;

  main.append(controlPanel, productsWrapper);

  return main;
}

export function footerCreater(): HTMLElement {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  function creater(
    elemClass: string,
    imgClass: string,
    link: string,
    path: string,
    text?: string
  ) {
    const element = document.createElement('a');
    const img = document.createElement('img');

    element.href = link;
    img.alt = imgClass;
    img.src = path;

    element.classList.add(elemClass);
    img.classList.add(imgClass);
    element.append(img);

    if (text) element.append(text);
    return element;
  }

  const githubLink = creater(
    'github-link',
    'github-image',
    'https://github.com/ReWired25',
    './assets/svg/github-icon-purple.svg',
    'ReWired25'
  );
  const rssLink = creater(
    'rss-link',
    'rss-image',
    'https://rs.school/js/',
    './assets/svg/rs_school_js-purple.svg'
  );

  const year = document.createElement('p');
  year.innerHTML =
    'All product rights reserved and property of Intel and AMD <br> 2022';
  footer.append(githubLink, year, rssLink);

  return footer;
}
