import elementCreater, { createSVGImage } from '../utilites/overall-functions';
import carIconTemplate from '../utilites/car-icon-svg';
import { IapiWinner, Icar } from '../types/interfaces';
import {
  getNumOfWinners,
  getSpecificCar,
  getWinnersForPage,
  getSpecificWinner,
  updateWinner,
} from '../api/api';
import WinnersState from '../states/winners-state';
import PaginationState from '../states/pagination-state';

export const createWinnerPageTitle = async () => {
  const titleWrapper = elementCreater('div', 'winner-title-wrapper');
  const title = elementCreater('h2', 'winner-page-title');
  const totalWinners = elementCreater('p', 'winners-total-number');
  const totalWinnersNumber = await getNumOfWinners();
  WinnersState.totalWinners = totalWinners;

  title.innerHTML = 'Winners';
  totalWinners.innerHTML = `Total ${totalWinnersNumber} winners`;
  titleWrapper.append(title, totalWinners);
  return titleWrapper;
};

const handlerTableButtons = (currentType: string, targetType: string) => {
  if (WinnersState.sortState.sortType === currentType) {
    WinnersState.sortState.sortType = targetType;
  }
  if (WinnersState.sortState.orderType === 'ASC') {
    WinnersState.sortState.orderType = 'DESC';
  } else if (WinnersState.sortState.orderType === 'DESC') {
    WinnersState.sortState.orderType = 'ASC';
  }
  const currentPage = Number(PaginationState.winnersPageCounter.innerHTML);
  WinnersState.listenerButtonUpdater(currentPage);
};

const createWinnerTableHeader = () => {
  const wrapper = elementCreater('div', 'winners-table-header');
  const numberTitle = elementCreater('p', 'winner-number-title');
  const carTitle = elementCreater('p', 'winner-car-title');
  const modelTitle = elementCreater('p', 'model-title');
  const winsTitle = elementCreater('button', 'winner-wins-title-button');
  const timeTitle = elementCreater('button', 'winner-time-title-button');

  winsTitle.addEventListener('click', () => {
    handlerTableButtons('time', 'wins');
  });

  timeTitle.addEventListener('click', () => {
    handlerTableButtons('wins', 'time');
  });

  numberTitle.innerHTML = 'Number';
  carTitle.innerHTML = 'Car';
  modelTitle.innerHTML = 'Model';
  winsTitle.innerHTML = 'Wins';
  timeTitle.innerHTML = 'Best time';

  const currentSort = WinnersState.sortState.sortType;
  const currentOrder = WinnersState.sortState.orderType;

  if (currentSort === 'wins' && currentOrder === 'ASC') {
    winsTitle.innerHTML += ' ↑';
  }
  if (currentSort === 'wins' && currentOrder === 'DESC') {
    winsTitle.innerHTML += ' ↓';
  }
  if (currentSort === 'time' && currentOrder === 'ASC') {
    timeTitle.innerHTML += ' ↑';
  }
  if (currentSort === 'time' && currentOrder === 'DESC') {
    timeTitle.innerHTML += ' ↓';
  }

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

const getCurrentPagePositions = () => {
  let basePosition: number;
  if (PaginationState.winnersPageCounter) {
    const currentPage = Number(PaginationState.winnersPageCounter.innerHTML);
    basePosition = (currentPage - 1) * 10;
  } else {
    basePosition = 0;
  }
  return basePosition;
};

const createWinnersViewsWrapper = async (winnersObjs: IapiWinner[]) => {
  const viewsWrapper = elementCreater('div', 'winners-table-views-wrapper');
  const basePosition = getCurrentPagePositions();

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
  const sort = WinnersState.sortState;
  const winners = await getWinnersForPage(
    numOfPage,
    sort.sortType,
    sort.orderType
  );

  const header = createWinnerTableHeader();
  const winnersViewWrapper = await createWinnersViewsWrapper(winners);

  const totalWinnersNumber = await getNumOfWinners();
  WinnersState.totalWinners.innerHTML = `Total ${totalWinnersNumber} winners`;

  WinnersState.tableContent.innerHTML = '';
  WinnersState.tableContent.append(header, winnersViewWrapper);
};

export const updateDefaultServerWinner = async () => {
  const winnerState = await getSpecificWinner(1);
  if (winnerState.time === 10) {
    await updateWinner(winnerState.id, winnerState.wins, 10000);
  }
};

export const forwardSortFuncToButton = () => {
  WinnersState.listenerButtonUpdater = updateWinnersTable;
};

export default createWinnersTableWrapper;
