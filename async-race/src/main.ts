import {
  getAllCars,
  getCarsForPage,
  getSpecificCar,
  // updateCar,
  // startStopCarEngine,
  // startCarDrive,
  getAllWinners,
  getWinnersForPage,
  // updateWinner,
  // createWinner,
} from './application/api/api';
import garagePageBuilder from './application/garage/garage-view-builder';
// import { createHundredCars } from './application/garage/cars-generator';

getAllCars();
getCarsForPage(1);

getSpecificCar(3);
getSpecificCar(2);
getSpecificCar(4);
getSpecificCar(1);
// updateCar(7, 'BMW M1', '#000000');
// startStopCarEngine(4, 'started');
// startCarDrive(4);
getAllWinners();
getWinnersForPage(1);

garagePageBuilder();
// createHundredCars();
