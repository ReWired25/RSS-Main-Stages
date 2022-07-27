import './style.scss';
import { loader } from './application/model/model';
import {
  FiltersMethods,
  LocalStorage,
} from './application/model/listeners-methods';

LocalStorage.loadDataFromStorage();
loader(FiltersMethods.filtersLauncher);
