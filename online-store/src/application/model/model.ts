import { buildPage } from '../view/view';
import { Iproduct } from '../types/interfaces';
import { ErrorHandler } from './error-handler';
import { CartMethods } from './cart-methods';

export async function loader(callback: (result: Iproduct[]) => void) {
  try {
    const resolve = await fetch('./assets/data/data.json');
    const result = await resolve.json();

    callback(result);
  } catch {
    ErrorHandler.responseHandler();
  }
}

export class ElementsFabric {
  static createModal(
    productWrapper: HTMLDivElement,
    cartButton: HTMLButtonElement,
    productObj: Iproduct
  ): void {
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
      const currElement = <HTMLParagraphElement | HTMLButtonElement | null>(
        elements[i].cloneNode(true)
      );

      if (currElement && !currElement.innerHTML.includes('Popularity')) {
        currElement.style.display = 'block';

        if (currElement.classList.contains('cart-button')) {
          currElement.addEventListener('click', () => {
            CartMethods.cartService(
              productWrapper,
              cartButton,
              productObj,
              <HTMLButtonElement>currElement
            );
          });
        }

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
    if (spec === 'Image') {
      const image = document.createElement('img');
      image.alt = 'cpu-photo';
      image.src = <string>value;

      return image;
    }

    const description = document.createElement('p');
    const span = document.createElement('span');

    if (typeof value === 'string') {
      span.innerHTML = value;
    }
    if (typeof value === 'number') {
      if (spec === 'Price') span.innerHTML = `${value} $`;
      else if (spec === 'TDP') span.innerHTML = `${value} W`;
      else span.innerHTML = `${value}`;
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

      const cartButton = document.createElement('button');
      cartButton.classList.add('cart-button');
      cartButton.innerHTML = 'add to cart';

      cartButton.addEventListener('click', () => {
        CartMethods.cartService(productWrapper, cartButton, product);
      });

      productWrapper.addEventListener('click', (event) => {
        if (event.target !== cartButton)
          ElementsFabric.createModal(productWrapper, cartButton, product);
      });

      CartMethods.productsInCart.forEach((valuesArr) => {
        const modelName = valuesArr[0];
        const packageName = valuesArr[1];

        if (product.Model === modelName && product.Package === packageName) {
          if (!productWrapper.classList.contains('product-in-cart')) {
            productWrapper.classList.add('product-in-cart');
            cartButton.innerHTML = 'remove from cart';
          }
        }
      });

      productWrapper.append(cartButton);

      productsElements.push(productWrapper);
    });

    buildPage(productsElements);
  }
}
