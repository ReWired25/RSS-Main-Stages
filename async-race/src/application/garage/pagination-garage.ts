import elementCreater from '../utilites/overall-functions';
import { MaxCars } from '../types/enums';
import PaginationState from '../states/pagination-state';
import { getNumOfCars } from '../api/api';
import { updateCarsContent } from './cars-content';

const createNumOfPageCounter = (currentPage?: string) => {
  const pageCounterWrapper = elementCreater('div', 'page-counter-wrapper');
  const pageCounterTitle = elementCreater('p', 'page-counter-title');
  const pageCounter = elementCreater('p', 'page-counter');
  PaginationState.pageCounter = pageCounter;

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
  const totalCars = Number(await getNumOfCars());
  if (
    totalCars / MaxCars.carsOnPage < 1 ||
    totalCars / MaxCars.carsOnPage === 1
  ) {
    nextButton.setAttribute('disabled', '');
  }

  prevButton.addEventListener('click', () => {
    let currentPage = Number(PaginationState.pageCounter.innerHTML);

    nextButton.removeAttribute('disabled');
    currentPage -= 1;
    if (currentPage === 1) prevButton.setAttribute('disabled', '');

    PaginationState.pageCounter.innerHTML = currentPage.toString();
    updateCarsContent(currentPage);
  });

  nextButton.addEventListener('click', async () => {
    let currentPage = Number(PaginationState.pageCounter.innerHTML);
    const currentTotalCars = Number(await getNumOfCars());

    let totalPages = Math.trunc(currentTotalCars / MaxCars.carsOnPage);
    if (currentTotalCars % MaxCars.carsOnPage !== 0) totalPages += 1;

    if (currentPage < totalPages) {
      prevButton.removeAttribute('disabled');
      currentPage += 1;
      if (currentPage === totalPages) nextButton.setAttribute('disabled', '');

      PaginationState.pageCounter.innerHTML = currentPage.toString();
      updateCarsContent(currentPage);
    }
  });

  return { prevButton, nextButton };
};

const createPaginationWrapper = async () => {
  const wrapper = elementCreater('div', 'pagination-wrapper');
  const pageCounter = createNumOfPageCounter();
  const buttons = await createPaginationButtons();

  wrapper.append(buttons.prevButton, pageCounter, buttons.nextButton);
  PaginationState.paginationGarageWrapper = wrapper;
  return wrapper;
};

export const updatePagination = async () => {
  const currentPage = PaginationState.pageCounter.innerHTML;
  const pageCounter = createNumOfPageCounter(currentPage);
  const buttons = await createPaginationButtons();

  console.log('oh!');

  PaginationState.paginationGarageWrapper.innerHTML = '';
  PaginationState.paginationGarageWrapper.append(
    buttons.prevButton,
    pageCounter,
    buttons.nextButton
  );
};

export default createPaginationWrapper;
