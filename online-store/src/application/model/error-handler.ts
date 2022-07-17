import { buildPage } from '../view/view';

export class ErrorHandler {
  static withoutMatch(): void {
    const errorWrapper = document.createElement('div');
    const errorMessage = document.createElement('p');
    errorWrapper.classList.add('error-wrapper');
    errorMessage.classList.add('error-message');

    errorMessage.innerHTML = 'Sorry, no matches found';

    errorWrapper.append(errorMessage);
    buildPage([errorWrapper]);
  }
}
