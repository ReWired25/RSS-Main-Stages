// import { IAppController } from '../types/interfaces';
import {
  FiltersMethods,
  SortMethods,
  SearchMethod,
} from '../model/listeners-methods';
import { loader } from '../model/model';

// class AppController {

// }

// STANDART / OVERCLOCKABLE / EXTRA PERFOMANCE
// PCE express
// With GPU
// Memory type
// Package
// With cooler included
// TDW

// // family
// // socket

// "Category": "standart", /////////// +
// "Model": "Intel Core i5 11400F",
// "Family": "Rocket Lake", *****
// "Socket": "LGA 1200", *****
// "Core": 6,
// "Treads": 12,
// "Base Rate": "2.6 GHz",
// "Max Rate": "4.4 GHz",
// "PCE": "4.0", /////////// +
// "Memory": "DDR4", /////////// +
// "Package": "OEM", /////////// +
// "Cooler": false, *****
// "GPU": false, /////////// +
// "TDP": "65 W", ---------- / sort
// "Price": 197, ---------- range / sort
// "Popularity": 90 ------------ sort

// Sort: by price, by popularity, by relevance

// Range filters: by price, by GHz, maybe by cores

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

        console.log(input.name);
        console.log(input.id);

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

    if (texts) {
      input.name = spec;
      input.id = texts[i];

      const label = document.createElement('label');
      label.setAttribute('for', texts[i]);
      label.innerHTML = texts[i];

      div.append(input, label);
    } else {
      div.append(input);
    }
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
