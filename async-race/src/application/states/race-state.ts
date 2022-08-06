import { IfinishedCars, IcarElementsForRace } from '../types/interfaces';

class RaceState {
  static stoppedCars: Set<number> = new Set();

  static finishedCars: IfinishedCars[] = [];

  static carElementsForRace: IcarElementsForRace[] = [];
}

export default RaceState;
