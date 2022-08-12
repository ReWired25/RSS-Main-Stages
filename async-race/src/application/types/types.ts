import { Icar } from './interfaces';

export type CreateRequest = (
  carName: string,
  carColor: string
) => Promise<void>;

export type UpdateRequest = (
  carName: string,
  carColor: string,
  idNum: number
) => Promise<void>;

export type UpdateCarsFunc = (numOfPage: number) => Promise<void>;

export type StartStopCarFunc = (
  startButton: HTMLElement,
  stopButton: HTMLElement,
  startingCar: HTMLElement,
  carSatus: HTMLElement,
  carObj: Icar
) => Promise<void>;
