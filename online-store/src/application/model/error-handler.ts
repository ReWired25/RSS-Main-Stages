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

  static responseHandler(): void {
    const errorWrapper = document.createElement('div');
    const errorTitle = document.createElement('p');
    const errorMessage = document.createElement('p');

    errorWrapper.classList.add('resp-error-wrapper');
    errorTitle.classList.add('resp-error-title');
    errorMessage.classList.add('resp-error-message');

    errorTitle.innerHTML = 'Ooops! Something went wrong!';
    errorMessage.innerHTML =
      'The server cannot find the data. Try reloading the page, or check back later.';

    errorWrapper.append(errorTitle, errorMessage);

    document.body.innerHTML = '';
    document.body.append(errorWrapper);
  }
}
