import { Icar } from '../types/interfaces';
import RaceValues from '../types/enums';
import elementCreater from '../utilites/overall-functions';
import carIconTemplate from '../utilites/car-icon-svg';
import finishIconTemplate from '../utilites/finish-icon-svg';
import GarageState from '../states/garage-state';
import {
  getCarsForPage,
  getNumOfCars,
  deleteCar,
  startStopCarEngine,
  startCarDrive,
} from '../api/api';
import PaginationState from '../states/pagination-state';
import RaceState from '../states/race-state';

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

export const startCar = async (
  startButton: HTMLElement,
  stopButton: HTMLElement,
  startingCar: HTMLElement,
  carObj: Icar
) => {
  const currentCar = startingCar;
  const responseCarCondition = await startStopCarEngine(carObj.id, 'started');
  const carTime = responseCarCondition.distance / responseCarCondition.velocity;
  const currentWidth = document.body.clientWidth;

  currentCar.style.transition = `${carTime}ms`;
  currentCar.style.marginLeft = `${
    currentWidth - RaceValues.carWidth - RaceValues.wrapperPadding * 2
  }px`;
  startButton.setAttribute('disabled', '');
  stopButton.removeAttribute('disabled');

  if (responseCarCondition) {
    const raceCondition = await startCarDrive(carObj.id);
    if (raceCondition === 500) {
      if (RaceState.stoppedCars.has(carObj.id)) {
        RaceState.stoppedCars.delete(carObj.id);
      }
      console.log(`Oops! engine ${carObj.name} is broken!`);
      currentCar.style.transition = RaceValues.transitionDefault;
      currentCar.style.marginLeft = `${
        currentCar.offsetLeft - RaceValues.wrapperPadding
      }px`;
      await startStopCarEngine(carObj.id, 'stopped');
    }
    if (raceCondition === 200) {
      if (RaceState.stoppedCars.has(carObj.id)) {
        RaceState.stoppedCars.delete(carObj.id);
      } else {
        const timeStamp = Date.now();
        RaceState.finishedCars.push({ carObj, timeStamp });
      }
    }
  }
};

export const stopCar = async (
  startButton: HTMLElement,
  stopButton: HTMLElement,
  startingCar: HTMLElement,
  carObj: Icar
) => {
  const currentCar = startingCar;
  currentCar.style.transition = RaceValues.transitionDefault;
  currentCar.style.marginLeft = RaceValues.marginDefault;

  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', '');
  RaceState.stoppedCars.add(carObj.id);
  await startStopCarEngine(carObj.id, 'stopped');
};

const createSVGImage = (
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

export const createCarsView = (objs: Icar[]): HTMLElement[] => {
  const carsElementsArray: HTMLElement[] = [];

  objs.forEach((car) => {
    const carWrapper = elementCreater('div', 'car-view-wrapper');
    const carSelectButton = elementCreater('button', 'car-select-button');
    const carRemoveButton = elementCreater('button', 'car-remove-button');

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

    const carTitle = elementCreater('p', 'car-title');
    const carStartButton = elementCreater('button', 'car-start-button');
    const carStopButton = elementCreater('button', 'car-stop-button');
    const carImage = createSVGImage(
      carIconTemplate,
      'car-image-wrapper',
      'car-image-icon',
      car
    );
    const finishImage = createSVGImage(
      finishIconTemplate,
      'finish-image-wrapper',
      'finish-image-icon'
    );
    const carRoad = elementCreater('hr', 'car-road');
    carTitle.innerHTML = car.name;
    carStartButton.innerHTML = 'Start';
    carStopButton.innerHTML = 'Stop';
    carStopButton.setAttribute('disabled', '');

    carStartButton.addEventListener('click', () => {
      startCar(carStartButton, carStopButton, carImage, car);
    });
    carStopButton.addEventListener('click', async () => {
      stopCar(carStartButton, carStopButton, carImage, car);
    });
    RaceState.carElementsForRace.push({
      carStartButton,
      carStopButton,
      carImage,
      car,
    });

    carWrapper.append(
      carSelectButton,
      carRemoveButton,
      carTitle,
      carStartButton,
      carStopButton,
      finishImage,
      carImage,
      carRoad
    );
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
