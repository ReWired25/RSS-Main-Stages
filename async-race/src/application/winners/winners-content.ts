import elementCreater, { createSVGImage } from '../utilites/overall-functions';
import carIconTemplate from '../utilites/car-icon-svg';
import { IapiWinner, Icar } from '../types/interfaces';
import { getSpecificCar, getWinnersForPage } from '../api/api';
import WinnersState from '../states/winners-state';

const createWinnerTableHeader = () => {
  const wrapper = elementCreater('div', 'winners-table-header');
  const numberTitle = elementCreater('p', 'winner-number-title');
  const carTitle = elementCreater('p', 'winner-car-title');
  const modelTitle = elementCreater('p', 'model-title');
  const winsTitle = elementCreater('button', 'winner-wins-title-button');
  const timeTitle = elementCreater('button', 'winner-time-title-button');

  numberTitle.innerHTML = 'Number';
  carTitle.innerHTML = 'Car';
  modelTitle.innerHTML = 'Model';
  winsTitle.innerHTML = 'Wins';
  timeTitle.innerHTML = 'Best time (seconds)';

  wrapper.append(numberTitle, carTitle, modelTitle, winsTitle, timeTitle);
  return wrapper;
};

const createWinnerView = async (obj: IapiWinner, carPosition: number) => {
  const carData: Icar = await getSpecificCar(obj.id);

  const winnerWrapper = elementCreater('div', 'winner-wrapper');
  const numberInTable = elementCreater('p', 'winner-table-number');
  const carImage = createSVGImage(
    carIconTemplate,
    'car-table-image',
    'car-table-icon',
    carData
  );
  const model = elementCreater('p', 'winner-table-model');
  const winsCount = elementCreater('p', 'winners-table-wins-count');
  const bestTime = elementCreater('p', 'winner-table-time');

  numberInTable.innerHTML = carPosition.toString();
  model.innerHTML = carData.name;
  winsCount.innerHTML = obj.wins.toString();
  const bestTimeString = (obj.time / 1000).toFixed(2);
  bestTime.innerHTML = `${bestTimeString}s`;

  winnerWrapper.append(numberInTable, carImage, model, winsCount, bestTime);
  return winnerWrapper;
};

const createWinnersViewsWrapper = async (
  winnersObjs: IapiWinner[],
  pagePositions?: number
) => {
  const viewsWrapper = elementCreater('div', 'winners-table-views-wrapper');
  let basePosition = 0;
  if (pagePositions) basePosition = pagePositions;

  const createViewCallback = async (
    previousValue: Promise<HTMLElement[]>,
    winner: IapiWinner,
    index: number
  ) => {
    const currentValue = await previousValue;
    const currentWinnerPosition = basePosition + index + 1;
    const newWinnerView = await createWinnerView(winner, currentWinnerPosition);
    currentValue.push(newWinnerView);
    return currentValue;
  };

  const winnersElementsArray = await winnersObjs.reduce<Promise<HTMLElement[]>>(
    createViewCallback,
    new Promise((resolve) => {
      resolve([]);
    })
  );
  viewsWrapper.append(...winnersElementsArray);
  return viewsWrapper;
};

const createWinnersTableWrapper = async (winnersObjs: IapiWinner[]) => {
  const wrapper = elementCreater('div', 'winners-table-wrapper');
  const header = createWinnerTableHeader();
  const winners = await createWinnersViewsWrapper(winnersObjs);

  WinnersState.tableContent = wrapper;
  wrapper.append(header, winners);
  return wrapper;
};

export const updateWinnersTable = async (numOfPage: number) => {
  const winners = await getWinnersForPage(numOfPage);
  const header = createWinnerTableHeader();
  const winnersViewWrapper = await createWinnersViewsWrapper(winners);

  WinnersState.tableContent.innerHTML = '';
  WinnersState.tableContent.append(header, winnersViewWrapper);
};

export default createWinnersTableWrapper;
