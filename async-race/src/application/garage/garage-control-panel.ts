import { CreateRequest, UpdateRequest } from '../types/types';
import elementCreater from '../utilites/overall-functions';
import { createCar, updateCar } from '../api/api';
import GarageState from '../states/garage-state';

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

const listenerUpdateButton = (
  inputText: HTMLInputElement,
  inputColor: HTMLInputElement,
  updateRequest: UpdateRequest
) => {
  const carName = inputText;
  const carColor = inputColor;

  const currentIdCar = GarageState.selectedCarId;
  if (currentIdCar) {
    updateRequest(carName.value, carColor.value, currentIdCar);
    carName.value = '';
    carColor.value = '#FFFFFF';
  } else {
    throw new Error('SELECT A CAR');
  }
};

const listenerCreateButton = (
  inputText: HTMLInputElement,
  inputColor: HTMLInputElement,
  createRequest: CreateRequest
) => {
  const carName = inputText;
  const carColor = inputColor;
  createRequest(carName.value, carColor.value);
  carName.value = '';
  carColor.value = '#FFFFFF';
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

// const createCarMakerWrapper = () => {
//   const inputName = createInputCarProp('input-car-name', 'text');
//   const pickColor = createInputCarProp('input-car-color', 'color', '#FFFFFF');
//   const button = createCarMakeUpdateButton(
//     'car-create-button',
//     'create',
//     inputName,
//     pickColor,
//     createCar,
//     updateCar
//   );

//   const wrapper = elementCreater('div', 'car-create-wrapper');
//   wrapper.append(inputName, pickColor, button);
//   return wrapper;
// };

// const createCarUpdaterWrapper = () => {
//   const inputName = createInputCarProp('input-car-name', 'text');
//   const pickColor = createInputCarProp('input-car-color', 'color', '#FFFFFF');
//   const button = createCarMakeUpdateButton(
//     'car-update-button',
//     'update',
//     inputName,
//     pickColor,
//     createCar,
//     updateCar
//   );

//   const wrapper = elementCreater('div', 'car-update-wrapper');
//   wrapper.append(inputName, pickColor, button);
//   return wrapper;
// };

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

  const controlWrapper = elementCreater('div', 'control-panel-wrapper');
  controlWrapper.append(createFunctionality, updateFunctionality);
  return controlWrapper;
};

export default createGarageControlWrapper;
