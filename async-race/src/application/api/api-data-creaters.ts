export const createCarData = (carName: string, carColor: string) => {
  const data = {
    name: carName,
    color: carColor,
  };

  return data;
};

export const createWinnerData = (
  winsCount: number,
  bestTime: number,
  idNum?: number
) => {
  if (idNum) {
    const dataWithId = {
      id: idNum,
      wins: winsCount,
      time: bestTime,
    };

    return dataWithId;
  }

  const data = {
    wins: winsCount,
    time: bestTime,
  };

  return data;
};
