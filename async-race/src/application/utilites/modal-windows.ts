import elementCreater from './overall-functions';
import GarageState from '../states/garage-state';

const createModalWindow = (messageText: string) => {
  const wrapper = elementCreater('div', 'modal-wrapper');
  const message = elementCreater('p', 'modal-message');
  const closeButton = elementCreater('button', 'modal-close-button');

  message.innerHTML = messageText;
  closeButton.innerHTML = 'X';
  closeButton.addEventListener('click', () => {
    wrapper.remove();
  });

  wrapper.append(closeButton, message);
  GarageState.garagePageWrapper.append(wrapper);
};

export const createErrorModalWindow = () => {
  const bodyContains = document.body.children;
  const bodyContainsArr = Array.of(...bodyContains);
  const existingModal = bodyContainsArr.find((item) =>
    item.classList.contains('modal-error-wrapper')
  );
  if (existingModal) return;

  const wrapper = elementCreater('div', 'modal-error-wrapper');
  const messageTitle = elementCreater('p', 'modal-error-message-title');
  const messageText = elementCreater('p', 'modal-error-message');
  const mockServerLink =
    '<a class="mock-link" target="_blank" href="https://github.com/mikhama/async-race-api">mock server</a>';

  messageTitle.innerHTML =
    'Something went wrong!<br>Error 404: unable to get response from server.';
  messageText.innerHTML = `You need to raise the ${mockServerLink} attached to the task, or, if one is running, try reloading the application.`;
  wrapper.append(messageTitle, messageText);
  document.body.append(wrapper);
};

export default createModalWindow;
