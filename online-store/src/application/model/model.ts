import { buildPage } from '../view/view';
import { Iproduct } from '../types/interfaces';
// methods for listners // filters / sorts / search

export async function loader(callback: (result: Iproduct[]) => void) {
  const resolve = await fetch('./assets/data/data.json');
  const result = await resolve.json();

  callback(result);
}

export class ElementsFabric {
  static createModal(productWrapper: HTMLDivElement): void {
    const modal = document.createElement('div');
    modal.classList.add('product-modal');

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-modal-button');
    closeButton.innerHTML = '[ X ]';
    modal.append(closeButton);

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-background');
    modalContainer.append(modal);

    document.body.append(modalContainer);

    const elements = productWrapper.children;

    for (let i = 0; i < elements.length; i++) {
      const currElement = <HTMLParagraphElement | null>(
        elements[i].cloneNode(true)
      );

      if (currElement && !currElement.innerHTML.includes('Popularity')) {
        currElement.style.display = 'block';

        modal.append(currElement);
      }
    }

    modalContainer.addEventListener('click', (event) => {
      if (event.target === modalContainer || event.target === closeButton) {
        modalContainer.remove();
      }
    });
  }

  static createValueSpecs(
    value: string | number | boolean,
    spec: string
  ): HTMLElement {
    const description = document.createElement('p');
    const span = document.createElement('span');

    if (typeof value === 'string') {
      span.innerHTML = value;
    }
    if (typeof value === 'number') {
      spec === 'Price'
        ? (span.innerHTML = `${value}$`)
        : (span.innerHTML = `${value}`);
    }
    if (typeof value === 'boolean') {
      span.innerHTML = 'Discrete required';
    }

    description.innerHTML = `${spec}:`;
    description.append(span);

    const hiddenSpecs = [
      'Family',
      'Socket',
      'PCE',
      'Memory',
      'Package',
      'Cooler',
      'GPU',
      'TDP',
      'Popularity',
    ];

    if (hiddenSpecs.includes(spec)) {
      description.classList.add('hidden');
    }

    return description;
  }

  static productCreater(objs: Iproduct[]): void {
    const productsElements: HTMLElement[] = [];

    objs.forEach((product) => {
      const productWrapper = document.createElement('div');
      productWrapper.classList.add('product');

      const productSpecs = Object.keys(product);

      productSpecs.forEach((spec) => {
        const description = ElementsFabric.createValueSpecs(
          product[spec],
          spec
        );
        productWrapper.append(description);
      });

      productWrapper.addEventListener('click', () => {
        ElementsFabric.createModal(productWrapper);
      });

      productsElements.push(productWrapper);
    });

    buildPage(productsElements);
  }
}
