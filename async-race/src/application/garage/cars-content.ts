import { Icar } from '../types/interfaces';
import elementCreater from '../utilites/overall-functions';
import GarageState from '../states/garage-state';
import { getCarsForPage, getNumOfCars, deleteCar } from '../api/api';
import PaginationState from '../states/pagination-state';

const createContentTitle = (): HTMLElement => {
  const title = elementCreater('h2', 'garage-title');
  title.innerHTML = 'Garage';
  return title;
};

const createNumOfCarsCounter = (totalCars: string): HTMLElement => {
  const wrapper = elementCreater('div', 'cars-counter-wrapper');
  const counterTitle = elementCreater('p', 'cars-counter-title');
  const counter = elementCreater('p', 'cars-counter');
  GarageState.carsCounter = counter;

  counterTitle.innerHTML = 'Total cars in the garage';
  counter.innerHTML = totalCars;

  wrapper.append(counterTitle, counter);
  return wrapper;
};

const createCarsContentHeader = (totalCars: string): HTMLElement => {
  const title = createContentTitle();
  const carsCounter = createNumOfCarsCounter(totalCars);

  const contentHeader = elementCreater('div', 'cars-content-header');
  contentHeader.append(title, carsCounter);
  return contentHeader;
};

export const createCarsView = (objs: Icar[]): HTMLElement[] => {
  const carsElementsArray: HTMLElement[] = [];

  objs.forEach((car) => {
    const carWrapper = elementCreater('div', 'car-view-wrapper');
    const carContent = elementCreater('p', 'car-contet');
    const carSelectButton = elementCreater('button', 'car-select-button');
    const carRemoveButton = elementCreater('button', 'car-remove-button');

    carContent.id = car.id.toString();
    carSelectButton.id = car.id.toString();
    carRemoveButton.id = car.id.toString();
    carSelectButton.innerHTML = 'Select';
    carRemoveButton.innerHTML = 'Remove';

    carSelectButton.addEventListener('click', () => {
      GarageState.selectedCarId = Number(carSelectButton.id);
      GarageState.updateInputElement.focus();
    });
    carRemoveButton.addEventListener('click', () => {
      const idNum = Number(carRemoveButton.id);
      deleteCar(idNum);

      const currentPage = Number(PaginationState.pageCounter.innerHTML);
      GarageState.listenerButtonUpdater(currentPage);
    });

    carContent.innerHTML = `Model: ${car.name} Color: ${car.color}`;
    carWrapper.append(carContent, carSelectButton, carRemoveButton);
    carsElementsArray.push(carWrapper);
  });

  return carsElementsArray;
};

const createCarsViewWrapper = (objs: Icar[]): HTMLElement => {
  const carsView = createCarsView(objs);
  const wrapper = elementCreater('div', 'cars-view-wrapper');
  wrapper.append(...carsView);
  return wrapper;
};

export const createCarsContentWrapper = (
  objs: Icar[],
  totalCars: string
): HTMLElement => {
  const contentHeader = createCarsContentHeader(totalCars);
  const carsContent = createCarsViewWrapper(objs);
  const contentWrapper = elementCreater('div', 'cars-content-wrapper');
  GarageState.carsContentWrapper = contentWrapper;

  contentWrapper.append(contentHeader, carsContent);
  return contentWrapper;
};

export const updateCarsContent = async (numOfPage: number) => {
  const cars = await getCarsForPage(numOfPage);
  const numOfCars = await getNumOfCars();
  const contentHeader = createCarsContentHeader(numOfCars);
  const carsContent = createCarsViewWrapper(cars);

  GarageState.carsContentWrapper.innerHTML = '';
  GarageState.carsContentWrapper.append(contentHeader, carsContent);
};

export const forwardUpdateFuncToButton = () => {
  GarageState.listenerButtonUpdater = updateCarsContent;
};