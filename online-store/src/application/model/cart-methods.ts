import { Iproduct } from '../types/interfaces';
import { LocalStorage } from './listeners-methods';

export class CartMethods {
  static cart: HTMLParagraphElement;
  static productsCounter = 0;
  static productsInCart: string[][] = [];

  static addRemoveProduct(
    product: HTMLDivElement,
    cardButton: HTMLButtonElement,
    productObj: Iproduct,
    modalButton?: HTMLButtonElement
  ): void {
    if (!product.classList.contains('product-in-cart')) {
      if (CartMethods.productsCounter >= 20) {
        CartMethods.showModalFilledCart();
        return;
      }

      CartMethods.productsCounter++;
      CartMethods.cart.innerHTML = CartMethods.productsCounter.toString();
      cardButton.innerHTML = 'remove from cart';
      if (modalButton) modalButton.innerHTML = 'remove from cart';

      CartMethods.productsInCart.push([productObj.Model, productObj.Package]);

      LocalStorage.addDataInStorage();

      product.classList.add('product-in-cart');
    } else {
      CartMethods.productsCounter--;
      if (CartMethods.productsCounter) {
        CartMethods.cart.innerHTML = CartMethods.productsCounter.toString();
      } else {
        CartMethods.cart.innerHTML = '';
      }
      cardButton.innerHTML = 'add to cart';
      if (modalButton) modalButton.innerHTML = 'add to cart';

      const currIndex = CartMethods.productsInCart.findIndex((item) => {
        if (item[0] === productObj.Model && item[1] === productObj.Package) {
          return true;
        }
      });
      CartMethods.productsInCart.splice(currIndex, 1);
      LocalStorage.addDataInStorage();

      product.classList.remove('product-in-cart');
    }
  }

  static showModalFilledCart() {
    const modalWrapper = document.createElement('div');
    const modalWindow = document.createElement('div');
    modalWrapper.classList.add('cart-modal-wrapper');
    modalWindow.classList.add('cart-modal');

    const message = document.createElement('p');
    message.innerHTML = 'Sorry, all cart slots are full!';

    modalWrapper.addEventListener('click', () => {
      modalWrapper.remove();
    });

    modalWindow.append(message);
    modalWrapper.append(modalWindow);
    document.body.append(modalWrapper);
  }
}
