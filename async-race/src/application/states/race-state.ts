import {
  IfinishedCars,
  IcarElementsForRace,
  IresponseStartCar,
} from '../types/interfaces';

class RaceState {
  static startedCarsCounter = 0;

  static startedCars: IresponseStartCar[] = [];

  static stoppedCars: Set<number> = new Set();

  static startRaceTime: number;

  static finishedCars: IfinishedCars[] = [];

  static carElementsForRace: IcarElementsForRace[] = [];

  static raceCarsStatus: number[] = [];

  static startRaceButton: HTMLElement;

  static stopRaceButton: HTMLElement;
}

export default RaceState;
