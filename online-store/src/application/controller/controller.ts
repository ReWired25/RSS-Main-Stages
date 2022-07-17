// import { IAppController } from '../types/interfaces';
import { FiltersMethods } from '../model/listeners-methods';
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
  const newElemTwo = valueInputCreater('PCE express', 'PCE', 3, [
    '3.0',
    '4.0',
    '5.0',
  ]);
  const newElemThree = valueInputCreater('Memory type', 'Memory', 2, [
    'DDR4',
    'DDR5',
  ]);
  const newElemFour = valueInputCreater('Package', 'Package', 2, [
    'OEM',
    'BOX',
  ]);
  const newElemFive = valueInputCreater('Integrated graphics', 'GPU', 1, [
    'GPU',
  ]);
  const newElemSix = valueInputCreater('Cooling system', 'Cooler', 1, [
    'Included',
  ]);
  const newElemSeven = valueInputCreater('Socket', 'Socket', 3, [
    'LGA 1200',
    'LGA 1700',
    'AM4',
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
