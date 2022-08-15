import {
  createServerErrorModalWindow,
  createDriveErrorModalWindow,
  createMinorErrorModalWindow,
} from './modal-windows';
import { ErrorValues, ErrorDataStatus } from '../types/enums';

const handlerErrors = (errorStatus?: number) => {
  if (errorStatus === ErrorDataStatus.invalidContent) {
    createServerErrorModalWindow(
      ErrorValues.serverDataErrorTitle,
      ErrorValues.serverDataErrorMessage
    );
  } else if (errorStatus === ErrorDataStatus.unexpectedError) {
    createMinorErrorModalWindow();
  } else if (errorStatus) {
    createDriveErrorModalWindow(errorStatus);
  } else {
    createServerErrorModalWindow(
      ErrorValues.serverResponseErrorTitle,
      ErrorValues.serverResponseErrorMessage
    );
  }
};

export default handlerErrors;
