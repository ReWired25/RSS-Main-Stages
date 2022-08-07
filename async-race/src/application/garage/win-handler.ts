import RaceState from '../states/race-state';
import GarageState from '../states/garage-state';
import { MaxCars } from '../types/enums';
import { Icar } from '../types/interfaces';
import createModalWindow from './modal-windows';
import {
  createWinner,
  getSpecificWinner,
  updateWinner,
  getAllWinners,
} from '../api/api';

export const handlerRaceButtons = () => {
  const totalCars = Number(GarageState.carsCounter.innerHTML);

  if (totalCars >= MaxCars.carsOnPage) {
    if (RaceState.startedCars.length === MaxCars.carsOnPage) {
      RaceState.stopRaceButton.removeAttribute('disabled');
    }
  }
  if (totalCars < MaxCars.carsOnPage) {
    if (RaceState.startedCars.length === totalCars) {
      RaceState.stopRaceButton.removeAttribute('disabled');
    }
  }
};

const getWinnerCar = async () => {
  const carsWithTimes: { currentCar: Icar; raceTime: number }[] = [];

  RaceState.finishedCars.forEach((car) => {
    const raceTime = car.timeStamp - RaceState.startRaceTime;
    const currentCar = car.carObj;
    carsWithTimes.push({ currentCar, raceTime });
  });

  carsWithTimes.sort((carOne, carTwo) => carOne.raceTime - carTwo.raceTime);

  const carName = carsWithTimes[0].currentCar.name;
  const carId = carsWithTimes[0].currentCar.id;
  const carTime = carsWithTimes[0].raceTime;
  const carTimeModal = (carsWithTimes[0].raceTime / 1000).toFixed(2);
  createModalWindow(`The winner is ${carName}! Time: ${carTimeModal}s`);

  const winners = await getAllWinners();
  let idInclude = false;
  winners.forEach((winner) => {
    if (winner.id === carId) idInclude = true;
  });

  if (idInclude) {
    const winner = await getSpecificWinner(carId);
    if (winner.time > carTime) winner.time = carTime;
    winner.wins += 1;
    await updateWinner(winner.id, winner.wins, winner.time);
  } else {
    const firstWin = 1;
    createWinner(carId, firstWin, carTime);
  }
};

export const getWinner = () => {
  const totalCars = Number(GarageState.carsCounter.innerHTML);

  if (totalCars >= MaxCars.carsOnPage) {
    if (RaceState.raceCarsStatus.length === MaxCars.carsOnPage) {
      getWinnerCar();
    }
  }
  if (totalCars < MaxCars.carsOnPage) {
    if (RaceState.raceCarsStatus.length === totalCars) {
      getWinnerCar();
    }
  }
};
