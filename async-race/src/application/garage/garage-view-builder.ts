import { getCarsForPage, getNumOfCars } from '../api/api';
import {
  createCarsContentWrapper,
  forwardUpdateFuncToButton,
} from './cars-content';
import createGarageControlWrapper from './garage-control-panel';
import createPaginationWrapper from './pagination';

const garagePageBuilder = async () => {
  const cars = await getCarsForPage();
  const numOfCars = await getNumOfCars();

  const garageControlPanel = createGarageControlWrapper();
  const garageContent = createCarsContentWrapper(cars, numOfCars);
  const pagination = createPaginationWrapper();

  forwardUpdateFuncToButton();
  document.body.append(garageControlPanel, garageContent, pagination);
};

export default garagePageBuilder;
