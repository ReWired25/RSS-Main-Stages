export const getAllCars = async () => {
  const responseResult = await fetch('http://127.0.0.1:3000/garage');
  const cars = await responseResult.json();

  console.log(cars);
  return cars;
};

export const getCarsForPage = async (pageNum: number) => {
  const responseResult = await fetch(
    `http://127.0.0.1:3000/garage?_page=${pageNum}&_limit=2`
  );
  const cars = await responseResult.json();
  const totalCars = responseResult.headers.get('X-Total-Count');

  console.log(cars);
  return { cars, totalCars };
};

export const getSpecificCar = async (idNum: number) => {
  const responseResult = await fetch(`http://127.0.0.1:3000/garage/${idNum}`);
  const car = await responseResult.json();

  console.log(car);
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
  idNum: number,
  carName: string,
  carColor: string
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
) => {
  const responseResult = await fetch(
    `http://127.0.0.1:3000/engine?id=${idNum}&status=${engineAction}`,
    {
      method: 'PATCH',
    }
  );

  const carCondition = await responseResult.json();
  console.log(carCondition);
  return carCondition;
};

export const startCarDrive = async (idNum: number) => {
  await fetch(`http://127.0.0.1:3000/engine?id=${idNum}&status=drive`, {
    method: 'PATCH',
  });
};

export const getAllWinners = async () => {
  const responseResult = await fetch('http://127.0.0.1:3000/winners');
  const allWinners = await responseResult.json();

  console.log(allWinners);
  return allWinners;
};

export const getWinnersForPage = async (
  pageNum: number,
  sortType = 'time',
  orderType = 'ASC'
) => {
  const responseResult = await fetch(
    `http://127.0.0.1:3000/winners?_page=${pageNum}&_limit=2&_sort=${sortType}&_order=${orderType}`
  );
  const winners = await responseResult.json();

  console.log(winners);
  return winners;
};

export const getSpecificWinner = async (idNum: number) => {
  const responseResult = await fetch(`http://127.0.0.1:3000/winners/${idNum}`);
  const winner = await responseResult.json();

  console.log(winner);
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
