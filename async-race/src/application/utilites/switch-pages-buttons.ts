import elementCreater from './overall-functions';
import { updateWinnersTable } from '../winners/winners-content';
import { updateWinnersPagination } from '../winners/pagination-winners';
import PaginationState from '../states/pagination-state';

const createSwitchPagesButtons = (
  buttonClassName: string,
  buttonContent: string,
  currentPage: HTMLElement,
  targetPage: HTMLElement
) => {
  const button = elementCreater('button', buttonClassName);
  button.innerHTML = buttonContent;

  if (buttonClassName === 'to-winners-button') {
    button.addEventListener('click', () => {
      const numberOfWinnersPage = Number(
        PaginationState.winnersPageCounter.innerHTML
      );
      updateWinnersTable(numberOfWinnersPage);
      updateWinnersPagination();
      currentPage.classList.add('hidden');
      targetPage.classList.remove('hidden');
    });
  } else {
    button.addEventListener('click', () => {
      currentPage.classList.add('hidden');
      targetPage.classList.remove('hidden');
    });
  }

  return button;
};

export default createSwitchPagesButtons;
