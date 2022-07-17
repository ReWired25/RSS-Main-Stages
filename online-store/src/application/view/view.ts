import { mainCreater } from './page';

export function buildPage(elements: HTMLElement[]): void {
  const main = document.querySelector('main');
  if (main) {
    main.remove();
  }
  document.body.append(mainCreater(elements));
}
