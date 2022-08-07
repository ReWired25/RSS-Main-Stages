import elementCreater from '../utilites/overall-functions';

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
  document.body.append(wrapper);
};

export default createModalWindow;
