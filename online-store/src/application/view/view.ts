import { mainCreater } from './page';

export function buildPage(elements: HTMLElement[]): void {
  document.body.append(mainCreater(elements));
}
