import elementCreater from './overall-functions';
import GarageState from '../states/garage-state';
import { ErrorValues } from '../types/enums';

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

export const createErrorWrapper = (
  errorModalClass: string,
  errorTitle: string,
  errorMessage: string,
  errorStatus?: number
) => {
  const wrapper = elementCreater('div', errorModalClass);
  const messageTitle = elementCreater('p', 'modal-error-message-title');
  const messageText = elementCreater('p', 'modal-error-message');

  messageTitle.innerHTML = errorTitle;
  messageText.innerHTML = errorMessage;

  if (errorStatus) {
    messageTitle.innerHTML += ` Error: ${errorStatus}`;
    const closeButton = elementCreater('button', 'modal-drive-error-button');
    closeButton.innerHTML = 'X';
    closeButton.addEventListener('click', () => {
      wrapper.remove();
    });
    wrapper.append(closeButton, messageTitle, messageText);
  } else {
    wrapper.append(messageTitle, messageText);
  }

  document.body.append(wrapper);
};

export const createServerErrorModalWindow = (
  errorTitle: string,
  errorMessage: string
) => {
  const bodyContains = document.body.children;
  const bodyContainsArr = Array.of(...bodyContains);
  const existingModal = bodyContainsArr.find((item) =>
    item.classList.contains('modal-error-wrapper')
  );
  if (existingModal) return;

  createErrorWrapper('modal-error-wrapper', errorTitle, errorMessage);
};

export const createDriveErrorModalWindow = (errorStatus: number) => {
  createErrorWrapper(
    'modal-error-drive-wrapper',
    ErrorValues.driveResponseErrorTitle,
    ErrorValues.driveResponseErrorMessage,
    errorStatus
  );
};

export default createModalWindow;
