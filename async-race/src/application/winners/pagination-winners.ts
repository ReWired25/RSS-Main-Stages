import elementCreater from '../utilites/overall-functions';
import { MaxCars } from '../types/enums';
import PaginationState from '../states/pagination-state';
import { updateWinnersTable } from './winners-content';
import { getNumOfWinners } from '../api/api';

const createNumOfPageCounter = (currentPage?: string) => {
  const pageCounterWrapper = elementCreater('div', 'page-counter-wrapper');
  const pageCounterTitle = elementCreater('p', 'page-counter-title');
  const pageCounter = elementCreater('p', 'page-counter');
  PaginationState.winnersPageCounter = pageCounter;

  pageCounterTitle.innerHTML = 'Page:';
  if (currentPage) {
    pageCounter.innerHTML = currentPage;
  } else {
    pageCounter.innerHTML = '1';
  }

  pageCounterWrapper.append(pageCounterTitle, pageCounter);
  return pageCounterWrapper;
};

const createPaginationButtons = async () => {
  const prevButton = elementCreater('button', 'pagination-prev-button');
  const nextButton = elementCreater('button', 'pagination-next-button');
  prevButton.innerHTML = 'Previous';
  nextButton.innerHTML = 'Next';
  prevButton.setAttribute('disabled', '');
  const totalWinners = Number(await getNumOfWinners());
  if (
    totalWinners / MaxCars.winnersOnPage < 1 ||
    totalWinners / MaxCars.winnersOnPage === 1
  ) {
    nextButton.setAttribute('disabled', '');
  }

  prevButton.addEventListener('click', () => {
    let currentPage = Number(PaginationState.winnersPageCounter.innerHTML);

    nextButton.removeAttribute('disabled');
    currentPage -= 1;
    if (currentPage === 1) prevButton.setAttribute('disabled', '');

    PaginationState.winnersPageCounter.innerHTML = currentPage.toString();
    updateWinnersTable(currentPage);
  });

  nextButton.addEventListener('click', async () => {
    let currentPage = Number(PaginationState.winnersPageCounter.innerHTML);
    const currentTotalWinners = Number(await getNumOfWinners());

    let totalPages = Math.trunc(currentTotalWinners / MaxCars.winnersOnPage);
    if (currentTotalWinners % MaxCars.winnersOnPage !== 0) totalPages += 1;

    if (currentPage < totalPages) {
      prevButton.removeAttribute('disabled');
      currentPage += 1;
      if (currentPage === totalPages) nextButton.setAttribute('disabled', '');

      PaginationState.winnersPageCounter.innerHTML = currentPage.toString();
      updateWinnersTable(currentPage);
    }
  });

  return { prevButton, nextButton };
};

const createPaginationWinnerWrapper = async () => {
  const wrapper = elementCreater('div', 'pagination-wrapper');
  const pageCounter = createNumOfPageCounter();
  const buttons = await createPaginationButtons();

  wrapper.append(buttons.prevButton, pageCounter, buttons.nextButton);
  PaginationState.paginationWinnersWrapper = wrapper;
  return wrapper;
};

export const updateWinnersPagination = async () => {
  const currentPage = PaginationState.winnersPageCounter.innerHTML;
  const pageCounter = createNumOfPageCounter(currentPage);
  const buttons = await createPaginationButtons();

  PaginationState.paginationWinnersWrapper.innerHTML = '';
  PaginationState.paginationWinnersWrapper.append(
    buttons.prevButton,
    pageCounter,
    buttons.nextButton
  );
};

export default createPaginationWinnerWrapper;
