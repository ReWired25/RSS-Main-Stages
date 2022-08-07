import { getCarsForPage, getNumOfCars } from '../api/api';
import elementCreater from '../utilites/overall-functions';
import {
  createCarsContentWrapper,
  forwardUpdateFuncToButton,
} from './cars-content';
import createGarageControlWrapper from './garage-control-panel';
import createPaginationWrapper from './pagination-garage';

const garagePageBuilder = async () => {
  const cars = await getCarsForPage();
  const numOfCars = await getNumOfCars();

  const garagePageWrapper = elementCreater('div', 'garage-page');
  const garageControlPanel = createGarageControlWrapper();
  const garageContent = createCarsContentWrapper(cars, numOfCars);
  const pagination = await createPaginationWrapper();

  forwardUpdateFuncToButton();
  garagePageWrapper.append(garageControlPanel, garageContent, pagination);
  return garagePageWrapper;
};

export default garagePageBuilder;
