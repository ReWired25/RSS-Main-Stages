import './style.scss';
import { loader } from './application/model/model';
import { filtersCreater } from './application/controller/controller';
import {
  FiltersMethods,
  LocalStorage,
} from './application/model/listeners-methods';

LocalStorage.load();
filtersCreater();
loader(FiltersMethods.filterer);
