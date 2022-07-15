import { buildPage } from '../view/view';
import { Iproduct } from '../types/interfaces';

// methods for listners
// filters / sorts / search

async function loader() {
  const resolve = await fetch('./assets/data/data.json');
  const result = await resolve.json();

  console.log(result);
  productCreater(result);
}

loader();

function productCreater(objs: Iproduct[]): void {
  const productsElements: HTMLElement[] = [];

  objs.forEach((product) => {
    const productWrapper = document.createElement('div');
    productWrapper.classList.add('product');

    const productSpecs = Object.keys(product);

    productSpecs.forEach((spec) => {
      const description = createValueSpecs(product[spec], spec);
      productWrapper.append(description);
    });

    productsElements.push(productWrapper);
  });

  buildPage(productsElements);
}

function createValueSpecs(
  value: string | number | boolean,
  spec: string
): HTMLElement {
  const description = document.createElement('p');
  const span = document.createElement('span');

  if (typeof value === 'string') {
    span.innerHTML = value;
  }
  if (typeof value === 'number') {
    span.innerHTML = `${value}`;
  }
  if (typeof value === 'boolean') {
    if (value) span.innerHTML = 'included';
    else span.innerHTML = 'discrete required';
  }

  description.innerHTML = `${spec}:`;
  description.append(span);

  return description;
}
