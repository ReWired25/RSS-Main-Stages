import { Icar } from '../types/interfaces';
import elementCreater from '../utilites/overall-functions';
import GarageState from '../states/garage-state';

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

  // THROW TO STATE

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
    carContent.innerHTML = `Model: ${car.name} Color: ${car.color}`;

    carWrapper.append(carContent);
    carsElementsArray.push(carWrapper);
  });

  return carsElementsArray;
};

const createCarsViewWrapper = (objs: Icar[]): HTMLElement => {
  const carsView = createCarsView(objs);

  const wrapper = elementCreater('div', 'cars-view-wrapper');
  GarageState.carsViewWrapper = wrapper;

  // THROW TO STATE

  wrapper.append(...carsView);
  return wrapper;
};

const createCarsContentWrapper = (
  objs: Icar[],
  totalCars: string
): HTMLElement => {
  const contentHeader = createCarsContentHeader(totalCars);
  const carsContent = createCarsViewWrapper(objs);

  const contentWrapper = elementCreater('div', 'cars-content-wrapper');
  contentWrapper.append(contentHeader, carsContent);
  return contentWrapper;
};

export default createCarsContentWrapper;
