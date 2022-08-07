import { UpdateCarsFunc } from '../types/types';

class WinnersState {
  static tableContent: HTMLElement;

  static sortState: { sortType: string; orderType: string } = {
    sortType: 'time',
    orderType: 'ASC',
  };

  static totalWinners: HTMLElement;

  static listenerButtonUpdater: UpdateCarsFunc;
}

export default WinnersState;
