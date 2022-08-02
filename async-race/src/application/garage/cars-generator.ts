import { createCar } from '../api/api';

const getRandomNumber = (extNum: number): number => {
  const num = Math.random() * extNum;
  return Math.trunc(num);
};

const getRandomColor = (): string => {
  const baseArr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];

  let colorStr = '#';
  const colorLength = 7;

  for (let i = 1; i < colorLength; i += 1) {
    const index = getRandomNumber(16);
    const currValue = baseArr[index];
    colorStr += currValue;
  }

  return colorStr;
};

export const getNewCar = () => {
  const cars = [
    'Aston Martin',
    'BMW',
    'Audi',
    'Mercedes',
    'Volkswagen',
    'Jaguar',
    'Skoda',
    'McLaren',
    'Mazda',
    'Lexus',
  ];
  const models = [
    'Model One',
    'Model Two',
    'Model Three',
    'Model Four',
    'Model Five',
    'Sport Concept',
    'Coupe',
    'Electric Concept',
    'Turbo',
    'Custom Model',
  ];

  const carIndex = getRandomNumber(10);
  const modelIndex = getRandomNumber(10);
  const color = getRandomColor();

  return {
    carName: `${cars[carIndex]} ${models[modelIndex]}`,
    carColor: color,
  };
};

export const createHundredCars = () => {
  for (let i = 0; i < 100; i += 1) {
    const newCar = getNewCar();
    createCar(newCar.carName, newCar.carColor);
  }
};
