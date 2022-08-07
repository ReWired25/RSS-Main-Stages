import { Icar } from '../types/interfaces';

const elementCreater = (
  type: string,
  elementClassName: string
): HTMLElement => {
  const element = document.createElement(type);
  element.classList.add(elementClassName);
  return element;
};

export const createSVGImage = (
  template: string,
  wrapperClass: string,
  iconClass: string,
  carObj?: Icar
) => {
  const imageWrapper = elementCreater('div', wrapperClass);
  imageWrapper.innerHTML = template;
  const imageIcon = <SVGElement>imageWrapper.firstChild;
  imageIcon.classList.add(iconClass);
  if (carObj) imageIcon.style.fill = `${carObj.color}`;
  return imageWrapper;
};

export default elementCreater;
