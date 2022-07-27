import { headerCreater, mainCreater, footerCreater } from './page';

export function pageBuilder(elements: HTMLElement[]): void {
  const existingWrapper = document.querySelector('.products-wrapper');

  if (existingWrapper) {
    existingWrapper.innerHTML = '';
    existingWrapper.append(...elements);
    return;
  }

  const productsWrapper = document.createElement('div');
  productsWrapper.classList.add('products-wrapper');
  productsWrapper.append(...elements);

  document.body.append(
    headerCreater(),
    mainCreater(productsWrapper),
    footerCreater()
  );
}
