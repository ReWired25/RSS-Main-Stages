import { getCarsForPage, getNumOfCars } from '../api/api';
import GarageState from '../states/garage-state';
import elementCreater from '../utilites/overall-functions';
import {
  createCarsContentWrapper,
  forwardUpdateFuncToButton,
} from './cars-content';
import createGarageControlWrapper from './garage-control-panel';
import { createErrorModalWindow } from '../utilites/modal-windows';
import createPaginationWrapper from './pagination-garage';

const garagePageBuilder = async () => {
  try {
    const cars = await getCarsForPage();
    const numOfCars = await getNumOfCars();

    const garagePageWrapper = elementCreater('div', 'garage-page');
    const garageControlPanel = createGarageControlWrapper();
    const garageContent = createCarsContentWrapper(cars, numOfCars);
    const pagination = await createPaginationWrapper();

    forwardUpdateFuncToButton();
    garagePageWrapper.append(garageControlPanel, garageContent, pagination);
    GarageState.garagePageWrapper = garagePageWrapper;
    return garagePageWrapper;
  } catch {
    return createErrorModalWindow();
  }
};

export default garagePageBuilder;
