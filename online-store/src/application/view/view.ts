import { headerCreater, mainCreater, footerCreater } from './page';

export function buildPage(elements: HTMLElement[]): void {
  const main = document.querySelector('main');
  if (main) {
    main.remove();
  }
  document.body.append(headerCreater(), mainCreater(elements), footerCreater());
}
