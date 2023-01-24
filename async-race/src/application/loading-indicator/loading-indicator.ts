import elementCreater from '../utilites/overall-functions';

const createLoadingIndicator = () => {
  const loadingIndicatorContainer = elementCreater(
    'div',
    'loading-indicator-container'
  );
  const circlesContainer = elementCreater('div', 'loading-circles-container');
  const loadingIndicatorMessage = elementCreater(
    'div',
    'loading-indicator-message'
  );

  for (let i = 0; i < 3; i += 1) {
    circlesContainer.append(elementCreater('span', 'loading-indicator-circle'));
  }
  loadingIndicatorMessage.textContent = 'Loading';
  loadingIndicatorContainer.append(circlesContainer, loadingIndicatorMessage);

  return loadingIndicatorContainer;
};

export default createLoadingIndicator;
