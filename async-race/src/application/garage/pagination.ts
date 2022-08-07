import elementCreater from '../utilites/overall-functions';
import { MaxCars } from '../types/enums';
import PaginationState from '../states/pagination-state';
import { getNumOfCars } from '../api/api';
import { updateCarsContent } from './cars-content';
import GarageState from '../states/garage-state';

const createNumOfPageCounter = () => {
  const pageCounterWrapper = elementCreater('div', 'page-counter-wrapper');
  const pageCounterTitle = elementCreater('p', 'page-counter-title');
  const pageCounter = elementCreater('p', 'page-counter');
  PaginationState.pageCounter = pageCounter;

  pageCounterTitle.innerHTML = 'Page:';
  pageCounter.innerHTML = '1';

  pageCounterWrapper.append(pageCounterTitle, pageCounter);
  return pageCounterWrapper;
};

const createPaginationButtons = () => {
  const prevButton = elementCreater('button', 'pagination-prev-button');
  const nextButton = elementCreater('button', 'pagination-next-button');
  prevButton.innerHTML = 'Previous';
  nextButton.innerHTML = 'Next';
  prevButton.setAttribute('disabled', '');
  if (
    Number(GarageState.carsCounter.innerHTML) / MaxCars.carsOnPage < 1 ||
    Number(GarageState.carsCounter.innerHTML) / MaxCars.carsOnPage === 1
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
    const totalCars = Number(await getNumOfCars());

    let totalPages = Math.trunc(totalCars / MaxCars.carsOnPage);
    if (totalCars % MaxCars.carsOnPage !== 0) totalPages += 1;

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

const createPaginationWrapper = () => {
  const wrapper = elementCreater('div', 'pagination-wrapper');
  const pageCounter = createNumOfPageCounter();
  const buttons = createPaginationButtons();

  wrapper.append(buttons.prevButton, pageCounter, buttons.nextButton);
  return wrapper;
};

export default createPaginationWrapper;
