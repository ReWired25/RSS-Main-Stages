import { IfilterTemplate } from '../types/interfaces';
import {
  FiltersMethods,
  SortMethods,
  SearchMethod,
  FilterRange,
  ResetsMethods,
} from '../model/listeners-methods';
import { CartMethods } from '../model/cart-methods';
import noUiSlider, { target } from 'nouislider';
import { loader } from '../model/model';

function valueInputCreater(
  specName: string,
  spec: string,
  chekboxNum: number,
  texts: string[]
): HTMLDivElement {
  const valueWrapper = document.createElement('div');
  const legend = document.createElement('legend');

  legend.innerHTML = specName;

  valueWrapper.append(legend);

  for (let i = 0; i < chekboxNum; i++) {
    const input = document.createElement('input');
    input.type = 'checkbox';

    input.addEventListener('change', () => {
      if (input.checked) {
        FiltersMethods.checkboxCounter++;

        if (input.name === 'GPU') {
          FiltersMethods.filterTemplate[input.name].push(
            'Intel UHD 730',
            'Intel UHD 750',
            'Intel UHD 770',
            'Radeon Vega 6',
            'Radeon Vega 7',
            'Radeon Vega 8',
            'GPU'
          );
        } else {
          FiltersMethods.filterTemplate[input.name].push(input.id);
        }

        loader(FiltersMethods.filtersLauncher);
      }
      if (!input.checked) {
        FiltersMethods.checkboxCounter--;

        if (input.name === 'GPU') {
          FiltersMethods.filterTemplate[input.name].length = 0;
        } else {
          const index = FiltersMethods.filterTemplate[input.name].indexOf(
            input.id
          );
          FiltersMethods.filterTemplate[input.name].splice(index, 1);
        }

        loader(FiltersMethods.filtersLauncher);
      }
    });

    const checkedInputsJson = localStorage.getItem('values');

    if (checkedInputsJson) {
      const checkedInputsObj: IfilterTemplate = JSON.parse(checkedInputsJson);
      const checkedInputs = Object.values(checkedInputsObj);

      checkedInputs.forEach((valuesArr) => {
        valuesArr.forEach((value) => {
          if (value === texts[i]) input.setAttribute('checked', '');
        });
      });
    }

    input.name = spec;
    input.id = texts[i];

    const label = document.createElement('label');
    label.setAttribute('for', texts[i]);
    label.innerHTML = texts[i];

    ResetsMethods.inputsHolder.push(input);

    valueWrapper.append(input, label);
  }

  valueWrapper.classList.add('value-filter');
  return valueWrapper;
}

export function filtersCreater(): HTMLDivElement {
  const filtersArr = [
    ['Category', 'Category', 3, ['Standart', 'Overclock', 'Extra perfomance']],
    ['Socket', 'Socket', 3, ['LGA 1200', 'LGA 1700', 'AM4']],
    ['PCE express', 'PCE', 3, ['3.0', '4.0', '5.0']],
    ['Memory type', 'Memory', 2, ['DDR4', 'DDR5']],
    ['Package', 'Package', 2, ['OEM', 'BOX']],
    ['Integrated graphics', 'GPU', 1, ['GPU']],
    ['Cooling system', 'Cooler', 1, ['Included']],
  ];

  const filtersWrapper = document.createElement('div');
  filtersWrapper.classList.add('filters-wrapper');

  filtersArr.forEach((filters) => {
    const specName = <string>filters[0];
    const spec = <string>filters[1];
    const chekboxNum = <number>filters[2];
    const texts = <string[]>filters[3];

    const newElement = valueInputCreater(specName, spec, chekboxNum, texts);
    filtersWrapper.append(newElement);
  });

  return filtersWrapper;
}

export function cartCreater() {
  const cartElement = document.createElement('div');
  const cartCounter = document.createElement('p');
  cartElement.classList.add('cart');
  cartCounter.classList.add('cart-counter');

  CartMethods.cart = cartCounter;

  if (CartMethods.productsCounter > 0)
    cartCounter.innerHTML = CartMethods.productsCounter.toString();

  const cartImage = document.createElement('img');
  cartImage.classList.add('cart-image');
  cartImage.alt = 'cart-icon';
  cartImage.src = './assets/svg/shopping-cart.svg';

  cartElement.append(cartImage, cartCounter);

  return cartElement;
}

function sliderCreater(minValue: number, maxValue: number) {
  const sliderWrapper = document.createElement('div');
  const slider: target = document.createElement('div');
  sliderWrapper.classList.add('slider-wrapper');
  slider.classList.add('slider');

  noUiSlider.create(slider, {
    start: [minValue, maxValue],
    tooltips: true,
    connect: true,
    range: {
      min: minValue,
      max: maxValue,
    },
  });

  slider.noUiSlider?.on('change', () => {
    const values = <string[] | undefined>slider.noUiSlider?.get();

    if (values && +values[0] > 100) {
      FilterRange.minPrice = +values[0];
      FilterRange.maxPrice = +values[1];
    } else if (values && +values[0] < 100) {
      FilterRange.minGHz = +values[0];
      FilterRange.maxGHz = +values[1];
    }

    loader(FiltersMethods.filtersLauncher);
  });

  if (maxValue < 100) FilterRange.rateSlider = slider;
  else FilterRange.priseSlider = slider;

  sliderWrapper.append(slider);
  return sliderWrapper;
}

function sortCreater(): HTMLDivElement {
  const sortWrapper = document.createElement('div');
  sortWrapper.classList.add('sorting');

  const nameSort = document.createElement('p');
  nameSort.innerHTML = 'Sorting';
  sortWrapper.append(nameSort);

  const select = document.createElement('select');
  select.name = 'sort';

  const valueArr = [
    'popularity-descending',
    'price-ascending',
    'price-descending',
    'TDP-ascending',
  ];
  const nameArr = [
    'By popularity (desc)',
    'By price (asc)',
    'By price (desc)',
    'By TDP (asc)',
  ];

  for (let i = 0; i < nameArr.length; i++) {
    const option = document.createElement('option');
    option.value = valueArr[i];
    option.innerHTML = nameArr[i];

    select.append(option);
  }

  select.addEventListener('change', () => {
    SortMethods.selectedOpt = select.options[select.selectedIndex].value;

    loader(FiltersMethods.filtersLauncher);
  });

  sortWrapper.append(select);
  return sortWrapper;
}

function searchCreater() {
  const searchInput = document.createElement('input');
  searchInput.classList.add('search-input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Search';
  searchInput.autocomplete = 'off';
  searchInput.setAttribute('autofocus', '');

  searchInput.addEventListener('input', () => {
    const searchStr = searchInput.value;

    if (searchStr) {
      const regexp = new RegExp(`${searchStr}`, `gmi`);
      SearchMethod.regexp = regexp;
    } else {
      SearchMethod.regexp = '';
    }

    loader(FiltersMethods.filtersLauncher);
  });

  return searchInput;
}

function resetCreater(type: string) {
  const resetButton = document.createElement('button');
  resetButton.classList.add('reset-button');
  resetButton.innerHTML = type;

  if (type === 'reset filters') {
    resetButton.addEventListener('click', () => {
      ResetsMethods.resetFilters();

      loader(FiltersMethods.filtersLauncher);
    });
  } else {
    resetButton.addEventListener('click', () => {
      ResetsMethods.resetOptions();

      loader(FiltersMethods.filtersLauncher);
    });
  }

  return resetButton;
}

function controlPanelCreater() {
  const panel = document.createElement('div');
  panel.classList.add('control-panel');

  const filters = filtersCreater();

  panel.append(filters);

  const slidersWrapper = document.createElement('div');
  slidersWrapper.classList.add('sliders-wrapper');

  const rateTitle = document.createElement('p');
  rateTitle.classList.add('rate-title');
  rateTitle.innerHTML = 'Sort by clock-rate';

  const priceTitle = document.createElement('p');
  priceTitle.classList.add('price-title');
  priceTitle.innerHTML = 'Sort by price';

  const rateSlider = sliderCreater(2.1, 5.2);
  const priceSlider = sliderCreater(171, 832);
  slidersWrapper.append(rateTitle, rateSlider, priceTitle, priceSlider);

  panel.append(slidersWrapper);

  const sortSearchWrapper = document.createElement('div');
  sortSearchWrapper.classList.add('sort-search-wrapper');
  const newSort = sortCreater();
  const newSearch = searchCreater();

  const resetFilters = resetCreater('reset filters');
  const resetOptions = resetCreater('reset options');

  sortSearchWrapper.append(newSearch, newSort, resetFilters, resetOptions);

  panel.append(sortSearchWrapper);

  return panel;
}

export const controlPanelElemet = controlPanelCreater();
