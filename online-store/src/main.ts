import './style.scss';
import { loader } from './application/model/model';
import { filtersCreater } from './application/controller/controller';
import { FiltersMethods } from './application/model/listeners-methods';

filtersCreater();
// loader(ElementsFabric.productCreater);
loader(FiltersMethods.filterer);
