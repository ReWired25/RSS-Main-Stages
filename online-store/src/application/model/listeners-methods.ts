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
    let finalElements: Iproduct[] = [];

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

    SortMethods.sortingMethod(finalElements);
    finalElements = SearchMethod.searchFilter(finalElements);

    if (finalElements.length > 0) {
      ElementsFabric.productCreater(finalElements);
    } else if (!finalElements.length && SearchMethod.regexp) {
      ErrorHandler.withoutMatch();
    } else {
      FiltersMethods.checkboxCounter === 0
        ? ElementsFabric.productCreater(objs)
        : ErrorHandler.withoutMatch();
    }
  }
}

export class SortMethods {
  static selectedOpt = 'popularity-descending';

  static sortingMethod(objs: Iproduct[]): void {
    if (SortMethods.selectedOpt === 'popularity-descending') {
      objs.sort(
        (productA, productB) => productB['Popularity'] - productA['Popularity']
      );
    }
    if (SortMethods.selectedOpt === 'price-ascending') {
      objs.sort((productA, productB) => productA['Price'] - productB['Price']);
    }
    if (SortMethods.selectedOpt === 'price-descending') {
      objs.sort((productA, productB) => productB['Price'] - productA['Price']);
    }
    if (SortMethods.selectedOpt === 'TDP-ascending') {
      objs.sort((productA, productB) => productA['TDP'] - productB['TDP']);
    }
  }
}

export class SearchMethod {
  static regexp: RegExp | string;

  static searchFilter(objs: Iproduct[]) {
    if (!SearchMethod.regexp) return objs;

    const filteredArr: Iproduct[] = [];

    objs.forEach((product) => {
      if (product['Model'].match(SearchMethod.regexp)) {
        filteredArr.push(product);
      }
    });

    // const filteredArrTest = objs.filter((product) =>
    //   product['Model'].match(SearchMethod.regexp)
    // );

    return filteredArr;
  }
}
