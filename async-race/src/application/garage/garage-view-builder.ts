import { getCarsForPage, getNumOfCars } from '../api/api';
import { createCarsContentWrapper } from './cars-content';
import createPaginationWrapper from './pagination';
import createGarageControlWrapper from './garage-control-panel';

const garagePageBuilder = async () => {
  const cars = await getCarsForPage();
  const numOfCars = await getNumOfCars();

  const garageControlPanel = createGarageControlWrapper();
  const garageContent = createCarsContentWrapper(cars, numOfCars);

  // we can put garageContent in state and work with it

  const pagination = createPaginationWrapper();

  document.body.append(garageControlPanel, garageContent, pagination);
};

export default garagePageBuilder;
