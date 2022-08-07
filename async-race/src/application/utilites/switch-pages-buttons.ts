import elementCreater from './overall-functions';

const createSwitchPagesButtons = (
  buttonClassName: string,
  buttonContent: string,
  currentPage: HTMLElement,
  targetPage: HTMLElement
) => {
  const button = elementCreater('button', buttonClassName);
  button.innerHTML = buttonContent;

  button.addEventListener('click', () => {
    currentPage.classList.add('hidden');
    targetPage.classList.remove('hidden');
  });

  return button;
};

export default createSwitchPagesButtons;
