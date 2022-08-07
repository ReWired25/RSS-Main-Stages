export interface IapiStartCar {
  velocity: number;
  distance: number;
}

export interface IapiWinner {
  id: number;
  wins: number;
  time: number;
}

export interface Icar {
  name: string;
  color: string;
  id: number;
}

export interface IresponseStartCar {
  velocity: number;
  distance: number;
}

export interface IfinishedCars {
  carObj: Icar;
  timeStamp: number;
}

export interface IcarElementsForRace {
  carStartButton: HTMLElement;
  carStopButton: HTMLElement;
  carImage: HTMLElement;
  car: Icar;
}
