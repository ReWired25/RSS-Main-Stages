import createrCarsContentWrapper from './cars-content';
import { getCarsForPage, getNumOfCars } from '../api/api';

const garagePageBuilder = async () => {
  const cars = await getCarsForPage();
  const numOfCars = await getNumOfCars();

  const garageContent = createrCarsContentWrapper(cars, numOfCars);

  document.body.append(garageContent);
};

export default garagePageBuilder;
