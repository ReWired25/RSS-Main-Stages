import { Icar } from '../types/interfaces';
import { RaceValues, DriveStatus } from '../types/enums';
import elementCreater, { createSVGImage } from '../utilites/overall-functions';
import carIconTemplate from '../utilites/car-icon-svg';
import finishIconTemplate from '../utilites/finish-icon-svg';
import GarageState from '../states/garage-state';
import {
  getCarsForPage,
  getNumOfCars,
  deleteCar,
  startStopCarEngine,
  startCarDrive,
  deleteWinner,
  getAllWinners,
} from '../api/api';
import PaginationState from '../states/pagination-state';
import RaceState from '../states/race-state';
import { addWinner, handlerRaceButtons } from './win-handler';
import createModalWindow from '../utilites/modal-windows';

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
  carSatus: HTMLElement,
  carObj: Icar
) => {
  RaceState.startedCarsCounter += 1;
  const currentCar = startingCar;
  const currentCarStatus = carSatus;
  const responseCarCondition = await startStopCarEngine(carObj.id, 'started');
  if (!responseCarCondition) return;
  const carTime = responseCarCondition.distance / responseCarCondition.velocity;
  const currentWidth = document.body.clientWidth;

  currentCar.style.transition = `${carTime}ms`;
  currentCar.style.marginLeft = `${
    currentWidth - RaceValues.carWidth - RaceValues.wrapperPadding * 2
  }px`;
  startButton.setAttribute('disabled', '');
  if (!RaceState.startRaceButton.classList.contains('active')) {
    stopButton.removeAttribute('disabled');
  }
  RaceState.startRaceButton.setAttribute('disabled', '');
  RaceState.stoppedCars.clear();
  RaceState.finishedCars = [];

  if (responseCarCondition) {
    RaceState.startedCars.push(responseCarCondition);
    handlerRaceButtons();
    const raceCondition = await startCarDrive(carObj.id);
    if (raceCondition === DriveStatus.engineBroken) {
      if (RaceState.stoppedCars.has(carObj.id)) {
        RaceState.stoppedCars.delete(carObj.id);
        return;
      }
      currentCarStatus.innerHTML = `Oops! engine ${carObj.name} is broken!`;
      console.log(`Oops! engine ${carObj.name} is broken!`);
      currentCar.style.transition = RaceValues.transitionDefault;
      currentCar.style.marginLeft = `${
        currentCar.offsetLeft - RaceValues.wrapperPadding
      }px`;
      await startStopCarEngine(carObj.id, 'stopped');
      RaceState.raceCarsStatus.push(raceCondition);
    }
    if (raceCondition === DriveStatus.finished) {
      if (RaceState.stoppedCars.has(carObj.id)) {
        RaceState.stoppedCars.delete(carObj.id);
      } else {
        const timeStamp = Date.now();
        if (RaceState.finishedCars.length === 0) {
          if (RaceState.startRaceTime) {
            const carWinTime = timeStamp - RaceState.startRaceTime;
            const carTimeModal = (carWinTime / 1000).toFixed(2);
            createModalWindow(
              `The winner is ${carObj.name}! Time: ${carTimeModal}s`
            );
            addWinner(carObj, carWinTime);
          }
        }
        RaceState.finishedCars.push({ carObj, timeStamp });
        RaceState.raceCarsStatus.push(raceCondition);
      }
    }
  }
};

export const stopCar = async (
  startButton: HTMLElement,
  stopButton: HTMLElement,
  startingCar: HTMLElement,
  carSatus: HTMLElement,
  carObj: Icar
) => {
  RaceState.startedCarsCounter -= 1;
  const currentCar = startingCar;
  const currentCarStatus = carSatus;
  currentCar.style.transition = RaceValues.transitionDefault;
  currentCar.style.marginLeft = RaceValues.marginDefault;

  currentCarStatus.innerHTML = '';
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', '');
  RaceState.stoppedCars.add(carObj.id);
  RaceState.startedCars = [];
  if (RaceState.startedCarsCounter === 0) {
    RaceState.startRaceButton.classList.remove('active');
    RaceState.startRaceButton.removeAttribute('disabled');
  }
  await startStopCarEngine(carObj.id, 'stopped');
};

export const createCarsView = (objs: Icar[]): HTMLElement[] => {
  const carsElementsArray: HTMLElement[] = [];
  RaceState.carElementsForRace = [];

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
    carRemoveButton.addEventListener('click', async () => {
      const idNum = Number(carRemoveButton.id);
      deleteCar(idNum);
      const allWinners = await getAllWinners();
      if (allWinners) {
        allWinners.forEach((winner) => {
          if (winner.id === idNum) deleteWinner(idNum);
        });
      }
      const currentPage = Number(PaginationState.pageCounter.innerHTML);
      GarageState.listenerButtonUpdater(currentPage);
    });

    const carTitle = elementCreater('p', 'car-title');
    const carStatus = elementCreater('p', 'car-engine-status');
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
      startCar(carStartButton, carStopButton, carImage, carStatus, car);
    });
    carStopButton.addEventListener('click', async () => {
      stopCar(carStartButton, carStopButton, carImage, carStatus, car);
    });
    RaceState.carElementsForRace.push({
      carStartButton,
      carStopButton,
      carImage,
      carStatus,
      car,
    });

    carWrapper.append(
      carSelectButton,
      carRemoveButton,
      carStatus,
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

  if (numOfCars && cars) {
    const contentHeader = createCarsContentHeader(numOfCars);
    const carsContent = createCarsViewWrapper(cars);

    GarageState.carsContentWrapper.innerHTML = '';
    GarageState.carsContentWrapper.append(contentHeader, carsContent);
  }
  // const carsContent = createCarsViewWrapper(cars);

  // GarageState.carsContentWrapper.innerHTML = '';
  // GarageState.carsContentWrapper.append(contentHeader, carsContent);
};

export const forwardUpdateFuncToButton = () => {
  GarageState.listenerButtonUpdater = updateCarsContent;
};
