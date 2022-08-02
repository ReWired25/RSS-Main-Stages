import { Icar } from '../types/interfaces';

const elementCreater = (
  type: string,
  elementClassName: string
): HTMLElement => {
  const element = document.createElement(type);
  element.classList.add(elementClassName);
  return element;
};

const createContentTitle = (): HTMLElement => {
  const title = elementCreater('h2', 'garage-title');
  title.innerHTML = 'Garage';
  return title;
};

const createNumOfCarsCounter = (totalCars: string): HTMLElement => {
  const wrapper = elementCreater('div', 'cars-counter-wrapper');

  const counterTitle = elementCreater('p', 'cars-counter-title');
  counterTitle.innerHTML = 'Total cars in the garage';
  const counter = elementCreater('p', 'cars-counter');
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

const createCarView = (objs: Icar[]): HTMLElement[] => {
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
  const carsView = createCarView(objs);

  const wrapper = elementCreater('div', 'cars-view-wrapper');
  wrapper.append(...carsView);
  return wrapper;
};

const createrCarsContentWrapper = (
  objs: Icar[],
  totalCars: string
): HTMLElement => {
  const contentHeader = createCarsContentHeader(totalCars);
  const carsContent = createCarsViewWrapper(objs);

  const contentWrapper = elementCreater('div', 'cars-content-wrapper');
  contentWrapper.append(contentHeader, carsContent);
  return contentWrapper;
};

export default createrCarsContentWrapper;
