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

getAllCars();
getCarsForPage(1);

getSpecificCar(3);
getSpecificCar(2);
getSpecificCar(4);
getSpecificCar(1);

// createCar('BMW M1', '#FFFFFF');
// updateCar(7, 'BMW M1', '#000000');
// startStopCarEngine(4, 'started');
// startCarDrive(4);

getAllWinners();
getWinnersForPage(1);
