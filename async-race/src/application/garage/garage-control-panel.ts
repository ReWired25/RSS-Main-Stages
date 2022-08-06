import { CreateRequest, UpdateRequest, StartStopCarFunc } from '../types/types';
import elementCreater from '../utilites/overall-functions';
import { createCar, updateCar } from '../api/api';
import GarageState from '../states/garage-state';
import PaginationState from '../states/pagination-state';
import { updateCarsContent, startCar, stopCar } from './cars-content';
import createHundredCars from './hundred-cars-generator';
import RaceState from '../states/race-state';

const createInputCarProp = (
  inputClassName: string,
  inputType: string,
  inputValue?: string
) => {
  const input = <HTMLInputElement>elementCreater('input', inputClassName);
  input.type = inputType;
  if (inputValue) input.value = inputValue;
  return input;
};

const listenerCreateButton = (
  inputText: HTMLInputElement,
  inputColor: HTMLInputElement,
  createRequest: CreateRequest
) => {
  if (!inputText.value) throw new Error('Enter the name of the auto!');

  const carName = inputText;
  const carColor = inputColor;

  createRequest(carName.value, carColor.value);
  carName.value = '';
  carColor.value = '#FFFFFF';

  const currentPage = Number(PaginationState.pageCounter.innerHTML);
  updateCarsContent(currentPage);
};

const listenerUpdateButton = (
  inputText: HTMLInputElement,
  inputColor: HTMLInputElement,
  updateRequest: UpdateRequest
) => {
  if (!inputText.value) throw new Error('Enter the name of the auto!');

  const carName = inputText;
  const carColor = inputColor;

  const currentIdCar = GarageState.selectedCarId;
  if (currentIdCar) {
    updateRequest(carName.value, carColor.value, currentIdCar);
    carName.value = '';
    carColor.value = '#FFFFFF';
    GarageState.selectedCarId = 0;

    const currentPage = Number(PaginationState.pageCounter.innerHTML);
    updateCarsContent(currentPage);
  } else {
    throw new Error('SELECT A CAR');
  }
};

const createCarMakeUpdateButton = (
  buttonClassName: string,
  buttonContent: string,
  inputText: HTMLInputElement,
  inputColor: HTMLInputElement,
  createRequest: CreateRequest,
  updateRequest: UpdateRequest,
  isUpdate?: boolean
) => {
  const button = elementCreater('button', buttonClassName);
  button.innerHTML = buttonContent;

  if (isUpdate) {
    button.addEventListener('click', () => {
      listenerUpdateButton(inputText, inputColor, updateRequest);
    });
  } else {
    button.addEventListener('click', () => {
      listenerCreateButton(inputText, inputColor, createRequest);
    });
  }

  return button;
};

const createCarMakerUpdaterWrapper = (
  buttonTypeClass: string,
  buttonContent: string,
  wrapperTypeClass: string,
  isUpdate?: boolean
) => {
  const inputName = createInputCarProp('input-car-name', 'text');
  const pickColor = createInputCarProp('input-car-color', 'color', '#FFFFFF');
  let button;
  if (isUpdate) {
    GarageState.updateInputElement = inputName;
    button = createCarMakeUpdateButton(
      buttonTypeClass,
      buttonContent,
      inputName,
      pickColor,
      createCar,
      updateCar,
      true
    );
  } else {
    button = createCarMakeUpdateButton(
      buttonTypeClass,
      buttonContent,
      inputName,
      pickColor,
      createCar,
      updateCar
    );
  }
  const wrapper = elementCreater('div', wrapperTypeClass);
  wrapper.append(inputName, pickColor, button);
  return wrapper;
};

const createRaceStartStopButtons = (
  typeButton: string,
  buttonContent: string,
  callback: StartStopCarFunc
) => {
  const raceButton = elementCreater('button', typeButton);
  raceButton.innerHTML = buttonContent;

  raceButton.addEventListener('click', () => {
    const carsArr = RaceState.carElementsForRace;
    carsArr.forEach((currentCar) => {
      callback(
        currentCar.carStartButton,
        currentCar.carStopButton,
        currentCar.carImage,
        currentCar.car
      );
    });
  });

  return raceButton;
};

const createHundredCarsButton = () => {
  const button = elementCreater('button', 'hundred-cars-button');
  button.innerHTML = 'Generate cars';
  button.addEventListener('click', () => {
    createHundredCars();
    const currentPage = Number(PaginationState.pageCounter.innerHTML);
    updateCarsContent(currentPage);
  });
  return button;
};

const createGarageControlWrapper = () => {
  const createFunctionality = createCarMakerUpdaterWrapper(
    'car-create-button',
    'create',
    'car-create-wrapper'
  );
  const updateFunctionality = createCarMakerUpdaterWrapper(
    'car-update-button',
    'update',
    'car-update-wrapper',
    true
  );
  const generatorCarsButton = createHundredCarsButton();
  const raceStartButton = createRaceStartStopButtons(
    'race-start-button',
    'Start race',
    startCar
  );
  const raceStopButton = createRaceStartStopButtons(
    'race-stop-button',
    'Stop race',
    stopCar
  );

  const controlWrapper = elementCreater('div', 'control-panel-wrapper');
  controlWrapper.append(
    createFunctionality,
    updateFunctionality,
    generatorCarsButton,
    raceStartButton,
    raceStopButton
  );
  return controlWrapper;
};

export default createGarageControlWrapper;
