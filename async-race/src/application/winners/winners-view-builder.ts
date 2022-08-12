import elementCreater from '../utilites/overall-functions';
import { getWinnersForPage } from '../api/api';
import createWinnersTableWrapper, {
  forwardSortFuncToButton,
  createWinnerPageTitle,
  updateDefaultServerWinner,
} from './winners-content';
import createPaginationWinnerWrapper from './pagination-winners';
import handlerErrors from '../utilites/errors-handler';

const winnersPageBuilder = async () => {
  try {
    const winnersOnPage = await getWinnersForPage(1);

    const winnersPageWrapper = elementCreater('div', 'winners-page');
    const winnersTitle = await createWinnerPageTitle();
    const winnersTable = await createWinnersTableWrapper(winnersOnPage);
    const winnersPagination = await createPaginationWinnerWrapper();

    updateDefaultServerWinner();
    forwardSortFuncToButton();
    winnersPageWrapper.append(winnersTitle, winnersTable, winnersPagination);
    return winnersPageWrapper;
  } catch {
    return handlerErrors();
  }
};

export default winnersPageBuilder;