import { Icar, IapiStartCar, IapiWinner } from '../types/interfaces';
import { Server, DriveStatus, ErrorDataStatus } from '../types/enums';
import { createCarData, createWinnerData } from './api-data-creaters';
import handlerErrors from '../utilites/errors-handler';

export const getAllCars = async (): Promise<Icar[]> => {
  const responseResult = await fetch(`${Server.URL}garage`);
  const cars = await responseResult.json();

  return cars;
};

export const getCarsForPage = async (pageNum = 1): Promise<Icar[]> => {
  const responseResult = await fetch(
    `${Server.URL}garage?_page=${pageNum}&_limit=7`
  );
  const cars = await responseResult.json();

  if (!cars || !cars.length) handlerErrors(ErrorDataStatus.invalidContent);

  return cars;
};

export const getNumOfCars = async () => {
  const responseResult = await fetch(`${Server.URL}garage?_page=1&_limit=7`);
  const totalNumOfCars = <string>responseResult.headers.get('X-Total-Count');
  return totalNumOfCars;
};

export const getSpecificCar = async (idNum: number): Promise<Icar> => {
  const responseResult = await fetch(`${Server.URL}garage/${idNum}`);
  const car = await responseResult.json();

  return car;
};

export const createCar = async (carName: string, carColor: string) => {
  const data = createCarData(carName, carColor);

  await fetch(`${Server.URL}garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const deleteCar = async (idNum: number) => {
  await fetch(`${Server.URL}garage/${idNum}`, {
    method: 'DELETE',
  });
};

export const updateCar = async (
  carName: string,
  carColor: string,
  idNum: number
) => {
  const data = createCarData(carName, carColor);

  await fetch(`${Server.URL}garage/${idNum}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const startStopCarEngine = async (
  idNum: number,
  engineAction: string
): Promise<IapiStartCar> => {
  const responseResult = await fetch(
    `${Server.URL}engine?id=${idNum}&status=${engineAction}`,
    {
      method: 'PATCH',
    }
  );

  const carCondition = await responseResult.json();
  return carCondition;
};

export const startCarDrive = async (idNum: number) => {
  const responseResult = await fetch(
    `${Server.URL}engine?id=${idNum}&status=drive`,
    {
      method: 'PATCH',
    }
  );

  if (
    responseResult.status !== DriveStatus.engineBroken &&
    responseResult.status !== DriveStatus.finished
  ) {
    handlerErrors(responseResult.status);
  }

  return responseResult.status;
};

export const getAllWinners = async (): Promise<IapiWinner[]> => {
  const responseResult = await fetch(`${Server.URL}winners`);
  const allWinners = await responseResult.json();

  return allWinners;
};

export const getNumOfWinners = async () => {
  const responseResult = await fetch(`${Server.URL}winners?_page=1&_limit=10`);
  const totalNumOfWinners = <string>responseResult.headers.get('X-Total-Count');
  return totalNumOfWinners;
};

export const getWinnersForPage = async (
  pageNum: number,
  sortType = 'time',
  orderType = 'ASC'
): Promise<IapiWinner[]> => {
  const responseResult = await fetch(
    `${Server.URL}winners?_page=${pageNum}&_limit=10&_sort=${sortType}&_order=${orderType}`
  );
  const winners = await responseResult.json();

  return winners;
};

export const getSpecificWinner = async (idNum: number): Promise<IapiWinner> => {
  const responseResult = await fetch(`${Server.URL}winners/${idNum}`);
  const winner = await responseResult.json();

  return winner;
};

export const createWinner = async (
  idNum: number,
  winsCount: number,
  bestTime: number
) => {
  const data = createWinnerData(winsCount, bestTime, idNum);

  await fetch(`${Server.URL}winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const deleteWinner = async (idNum: number) => {
  await fetch(`${Server.URL}winners/${idNum}`, {
    method: 'DELETE',
  });
};

export const updateWinner = async (
  idNum: number,
  winsCount: number,
  bestTime: number
) => {
  const data = createWinnerData(winsCount, bestTime);

  await fetch(`${Server.URL}winners/${idNum}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
