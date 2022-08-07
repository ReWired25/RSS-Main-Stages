import { getWinnersForPage } from '../api/api';
import createWinnersTableWrapper from './winners-content';

const winnersPageBuilder = async () => {
  const winnersOnPage = await getWinnersForPage(1);

  const winnersTable = await createWinnersTableWrapper(winnersOnPage);
  return winnersTable;
};

export default winnersPageBuilder;
