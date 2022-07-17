import { Iproduct, IfilterTemplate } from '../types/interfaces';
import { ElementsFabric } from './model';
import { ErrorHandler } from './error-handler';

export class FiltersMethods {
  static checkboxCounter = 0;
  static filterTemplate: IfilterTemplate = {
    Category: [],
    Socket: [],
    PCE: [],
    Memory: [],
    Package: [],
    Cooler: [],
    GPU: [],
  };

  static filterer(objs: Iproduct[]): void {
    const finalElements: Iproduct[] = [];

    objs.forEach((product) => {
      let rightProduct = true;

      const templateKeys = Object.keys(FiltersMethods.filterTemplate);

      templateKeys.forEach((spec) => {
        if (FiltersMethods.filterTemplate[spec].length) {
          const checkCategory = FiltersMethods.filterTemplate[spec].some(
            (value) => product[spec] === value
          );

          if (!checkCategory) {
            rightProduct = checkCategory;
          }
        }
      });

      if (rightProduct) {
        if (!finalElements.includes(product)) finalElements.push(product);
      }
    });

    console.log(FiltersMethods.checkboxCounter);
    console.log(finalElements);

    if (finalElements.length > 0) {
      ElementsFabric.productCreater(finalElements);
    } else {
      FiltersMethods.checkboxCounter === 0
        ? ElementsFabric.productCreater(objs)
        : ErrorHandler.withoutMatch();
    }
  }
}
