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
  const div = document.createElement('div');
  const legend = document.createElement('legend');

  legend.innerHTML = specName;

  div.append(legend);

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
            'Radeon Vega 8'
          );
        } else {
          FiltersMethods.filterTemplate[input.name].push(input.id);
        }

        loader(FiltersMethods.filterer);
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

        loader(FiltersMethods.filterer);
      }
    });

    const checkedInputs = Object.values(FiltersMethods.filterTemplate);
    checkedInputs.forEach((valuesArr) => {
      valuesArr.forEach((value) => {
        if (value === texts[i]) input.setAttribute('checked', '');
      });
    });

    input.name = spec;
    input.id = texts[i];

    const label = document.createElement('label');
    label.setAttribute('for', texts[i]);
    label.innerHTML = texts[i];

    ResetsMethods.inputsHolder.push(input);

    div.append(input, label);
    // if (texts) {
    //   input.name = spec;
    //   input.id = texts[i];

    //   const label = document.createElement('label');
    //   label.setAttribute('for', texts[i]);
    //   label.innerHTML = texts[i];

    //   div.append(input, label);
    // } else {
    //   div.append(input);
    // }
  }

  div.classList.add('value-filter');
  return div;
}

export function filtersCreater(): void {
  const newElem = valueInputCreater('Category', 'Category', 3, [
    'Standart',
    'Overclock',
    'Extra perfomance',
  ]);
  const newElemTwo = valueInputCreater('Socket', 'Socket', 3, [
    'LGA 1200',
    'LGA 1700',
    'AM4',
  ]);
  const newElemThree = valueInputCreater('PCE express', 'PCE', 3, [
    '3.0',
    '4.0',
    '5.0',
  ]);
  const newElemFour = valueInputCreater('Memory type', 'Memory', 2, [
    'DDR4',
    'DDR5',
  ]);
  const newElemFive = valueInputCreater('Package', 'Package', 2, [
    'OEM',
    'BOX',
  ]);
  const newElemSix = valueInputCreater('Integrated graphics', 'GPU', 1, [
    'GPU',
  ]);
  const newElemSeven = valueInputCreater('Cooling system', 'Cooler', 1, [
    'Included',
  ]);

  document.body.append(
    newElem,
    newElemTwo,
    newElemThree,
    newElemFour,
    newElemFive,
    newElemSix,
    newElemSeven
  );
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

    loader(FiltersMethods.filterer);
  });

  sortWrapper.append(select);
  return sortWrapper;
}

const newSort = sortCreater();
document.body.append(newSort);

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

    loader(FiltersMethods.filterer);
  });

  return searchInput;
}

const newSearch = searchCreater();
document.body.append(newSearch);

function cartCreater() {
  const cartElement = document.createElement('div');
  const cartCounter = document.createElement('p');
  cartElement.classList.add('cart');
  cartCounter.classList.add('cart-counter');

  CartMethods.cart = cartCounter;

  if (CartMethods.counter > 0)
    cartCounter.innerHTML = CartMethods.counter.toString();

  cartElement.append(cartCounter);

  return cartElement;
}

const newCart = cartCreater();
document.body.append(newCart);

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

    loader(FiltersMethods.filterer);
  });

  if (maxValue < 100) FilterRange.rateSlider = slider;
  else FilterRange.priseSlider = slider;

  sliderWrapper.append(slider);
  return sliderWrapper;
}

const newSlider = sliderCreater(2.1, 5.2);
const newSliderTwo = sliderCreater(171, 832);
document.body.append(newSlider, newSliderTwo);

function resetCreater(type: string) {
  const resetButton = document.createElement('button');
  resetButton.classList.add('reset-button');
  resetButton.innerHTML = type;

  if (type === 'reset filters') {
    resetButton.addEventListener('click', () => {
      ResetsMethods.filters();

      loader(FiltersMethods.filterer);
    });
  } else {
    resetButton.addEventListener('click', () => {
      ResetsMethods.options();

      loader(FiltersMethods.filterer);
    });
  }

  return resetButton;
}

const newReset = resetCreater('reset filters');
const newResetTwo = resetCreater('reset options');
document.body.append(newReset, newResetTwo);
