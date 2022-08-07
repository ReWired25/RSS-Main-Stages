import elementCreater from '../utilites/overall-functions';
import { getWinnersForPage } from '../api/api';
import createWinnersTableWrapper, {
  forwardSortFuncToButton,
  createWinnerPageTitle,
} from './winners-content';
import createPaginationWinnerWrapper from './pagination-winners';

const winnersPageBuilder = async () => {
  const winnersOnPage = await getWinnersForPage(1);

  const winnersPageWrapper = elementCreater('div', 'winners-page');
  const winnersTitle = await createWinnerPageTitle();
  const winnersTable = await createWinnersTableWrapper(winnersOnPage);
  const winnersPagination = await createPaginationWinnerWrapper();

  forwardSortFuncToButton();
  winnersPageWrapper.append(winnersTitle, winnersTable, winnersPagination);
  return winnersPageWrapper;
};

export default winnersPageBuilder;
