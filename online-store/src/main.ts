import './style.scss';
import { loader } from './application/model/model';
import {
  FiltersMethods,
  LocalStorage,
} from './application/model/listeners-methods';

LocalStorage.load();
loader(FiltersMethods.filterer);
