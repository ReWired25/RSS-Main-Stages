import elementCreater from '../utilites/overall-functions';

const createAppHeader = () => {
  const headerTitle = elementCreater('h1', 'header-title');
  headerTitle.innerHTML = 'Async race';
  return headerTitle;
};

export default createAppHeader;
