import './style.scss';
import { loader, ElementsFabric } from './application/model/model';
import { filtersCreater } from './application/controller/controller';

filtersCreater();
loader(ElementsFabric.productCreater);
