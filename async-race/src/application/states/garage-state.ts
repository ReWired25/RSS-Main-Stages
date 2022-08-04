import { UpdateCarsFunc } from '../types/types';

class GarageState {
  static carsCounter: HTMLElement;

  static carsContentWrapper: HTMLElement;

  static selectedCarId: number;

  static updateInputElement: HTMLInputElement;

  static listenerButtonUpdater: UpdateCarsFunc;
}

export default GarageState;
