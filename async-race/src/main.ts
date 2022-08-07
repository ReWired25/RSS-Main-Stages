import './style.scss';
import {
  getAllCars,
  getCarsForPage,
  // getSpecificCar,
  // updateCar,
  // startStopCarEngine,
  // startCarDrive,
  // getAllWinners,
  // getWinnersForPage,
  // updateWinner,
  // createWinner,
} from './application/api/api';
import garagePageBuilder from './application/garage/garage-view-builder';

getAllCars();
getCarsForPage(1);

// updateCar(7, 'BMW M1', '#000000');
// startStopCarEngine(4, 'started');
// startCarDrive(4);

garagePageBuilder();
// createHundredCars();
