const elementCreater = (
  type: string,
  elementClassName: string
): HTMLElement => {
  const element = document.createElement(type);
  element.classList.add(elementClassName);
  return element;
};

export default elementCreater;
