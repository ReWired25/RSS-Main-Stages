import { Iproduct, IfilterTemplate } from '../types/interfaces';
import { ElementsFabric } from './model';
import { ErrorHandler } from './error-handler';
import { CartMethods } from './cart-methods';
import { target } from 'nouislider';

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
    finalElements = FilterRange.rangeFilterer(finalElements);

    LocalStorage.add();

    if (finalElements.length > 0) {
      ElementsFabric.productCreater(finalElements);
    } else if (!finalElements.length && SearchMethod.regexp) {
      ErrorHandler.withoutMatch();
    } else if (
      !finalElements.length &&
      FilterRange.minPrice &&
      FilterRange.maxPrice
    ) {
      ErrorHandler.withoutMatch();
    } else if (
      !finalElements.length &&
      FilterRange.minGHz &&
      FilterRange.maxGHz
    ) {
      ErrorHandler.withoutMatch();
    } else {
      FiltersMethods.checkboxCounter === 0
        ? ElementsFabric.productCreater(objs)
        : ErrorHandler.withoutMatch();
    }
  }
}

export class FilterRange {
  static priseSlider: target;
  static rateSlider: target;
  static minPrice = 171;
  static maxPrice = 832;
  static minGHz = 2.1;
  static maxGHz = 5.2;

  static rangeFilterer(objs: Iproduct[]) {
    if (
      !FilterRange.minPrice &&
      !FilterRange.maxPrice &&
      !FilterRange.minGHz &&
      !FilterRange.maxGHz
    )
      return objs;

    const filteredArr = objs.filter((product) => {
      let isEqual = true;

      if (FilterRange.minPrice && FilterRange.maxPrice) {
        if (
          product.Price < FilterRange.minPrice ||
          product.Price > FilterRange.maxPrice
        ) {
          isEqual = false;
        }
      }

      if (FilterRange.minGHz && FilterRange.maxGHz) {
        if (
          parseFloat(product['Base Rate']) < FilterRange.minGHz ||
          parseFloat(product['Max Rate']) > FilterRange.maxGHz
        ) {
          isEqual = false;
        }
      }

      return isEqual;
    });

    console.log(filteredArr);

    return filteredArr;
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

    return filteredArr;
  }
}

export class LocalStorage {
  static add() {
    const jsonValues = JSON.stringify(FiltersMethods.filterTemplate);
    localStorage.setItem('values', jsonValues);

    const rangeArr = [
      FilterRange.minPrice,
      FilterRange.maxPrice,
      FilterRange.minGHz,
      FilterRange.maxGHz,
    ];
    const jsonRange = JSON.stringify(rangeArr);
    localStorage.setItem('range', jsonRange);

    localStorage.setItem('sort', SortMethods.selectedOpt);

    const jsonCart = JSON.stringify(CartMethods.productsInCart);
    localStorage.setItem('cart', jsonCart);
  }

  static load() {
    const jsonValues = localStorage.getItem('values');
    if (jsonValues) {
      const values: IfilterTemplate = JSON.parse(jsonValues);

      FiltersMethods.filterTemplate = values;
    }

    const jsonRange = localStorage.getItem('range');
    if (jsonRange) {
      const range: number[] = JSON.parse(jsonRange);

      FilterRange.minPrice = range[0];
      FilterRange.maxPrice = range[1];
      FilterRange.priseSlider.noUiSlider?.set([range[0], range[1]]);

      FilterRange.minGHz = range[2];
      FilterRange.maxGHz = range[3];
      FilterRange.rateSlider.noUiSlider?.set([range[2], range[3]]);
    }

    const sort = localStorage.getItem('sort');
    if (sort) SortMethods.selectedOpt = sort;

    const jsonCart = localStorage.getItem('cart');
    if (jsonCart) {
      const cart = JSON.parse(jsonCart);

      CartMethods.counter = cart.length;
      if (cart.length) CartMethods.cart.innerHTML = cart.length;
      CartMethods.productsInCart = cart;
    }
  }
}
