export const getAllCars = async () => {
  const responseResult = await fetch('http://127.0.0.1:3000/garage');
  const cars = await responseResult.json();

  return cars;
};

export const getCarsForPage = async (pageNum = 1) => {
  const responseResult = await fetch(
    `http://127.0.0.1:3000/garage?_page=${pageNum}&_limit=7`
  );
  const cars = await responseResult.json();

  return cars;
};

export const getNumOfCars = async () => {
  const responseResult = await fetch(
    `http://127.0.0.1:3000/garage?_page=1&_limit=7`
  );
  const totalNumOfCars = <string>responseResult.headers.get('X-Total-Count');
  return totalNumOfCars;
};

export const getSpecificCar = async (idNum: number) => {
  const responseResult = await fetch(`http://127.0.0.1:3000/garage/${idNum}`);
  const car = await responseResult.json();

  return car;
};

export const createCar = async (carName: string, carColor: string) => {
  const data = {
    name: carName,
    color: carColor,
  };

  await fetch(`http://127.0.0.1:3000/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const deleteCar = async (idNum: number) => {
  await fetch(`http://127.0.0.1:3000/garage/${idNum}`, {
    method: 'DELETE',
  });
};

export const updateCar = async (
  carName: string,
  carColor: string,
  idNum: number
) => {
  const data = {
    name: carName,
    color: carColor,
  };

  await fetch(`http://127.0.0.1:3000/garage/${idNum}`, {
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
): Promise<{ velocity: number; distance: number }> => {
  const responseResult = await fetch(
    `http://127.0.0.1:3000/engine?id=${idNum}&status=${engineAction}`,
    {
      method: 'PATCH',
    }
  );

  const carCondition = await responseResult.json();
  return carCondition;
};

export const startCarDrive = async (idNum: number) => {
  const responseResult = await fetch(
    `http://127.0.0.1:3000/engine?id=${idNum}&status=drive`,
    {
      method: 'PATCH',
    }
  );
  return responseResult.status;
};

export const getAllWinners = async (): Promise<
  {
    id: number;
    wins: number;
    time: number;
  }[]
> => {
  const responseResult = await fetch('http://127.0.0.1:3000/winners');
  const allWinners = await responseResult.json();

  return allWinners;
};

export const getWinnersForPage = async (
  pageNum: number,
  sortType = 'time',
  orderType = 'ASC'
) => {
  const responseResult = await fetch(
    `http://127.0.0.1:3000/winners?_page=${pageNum}&_limit=10&_sort=${sortType}&_order=${orderType}`
  );
  const winners = await responseResult.json();

  return winners;
};

export const getSpecificWinner = async (
  idNum: number
): Promise<{
  id: number;
  wins: number;
  time: number;
}> => {
  const responseResult = await fetch(`http://127.0.0.1:3000/winners/${idNum}`);
  const winner = await responseResult.json();

  return winner;
};

export const createWinner = async (
  idNum: number,
  winsCount: number,
  bestTime: number
) => {
  const data = {
    id: idNum,
    wins: winsCount,
    time: bestTime,
  };

  await fetch('http://127.0.0.1:3000/winners', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const deleteWinner = async (idNum: number) => {
  await fetch(`http://127.0.0.1:3000/winners/${idNum}`, {
    method: 'DELETE',
  });
};

export const updateWinner = async (
  idNum: number,
  winsCount: number,
  bestTime: number
) => {
  const data = {
    wins: winsCount,
    time: bestTime,
  };

  await fetch(`http://127.0.0.1:3000/winners/${idNum}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
