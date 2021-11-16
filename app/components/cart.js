import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CartComponent extends Component {
  @service shoppingCart;
  @tracked products = this.shoppingCartMock.items;

  removeFromCart = (productId) => {
    if (!productId) {
      return;
    }

    const productFromCart = this.shoppingCart.items.find(
      (p) => p.id === productId
    );

    if (productFromCart) {
      this.shoppingCart.remove(productFromCart);
      this.products = this.shoppingCart.items;
    }
  };

  get totalPrice() {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }

  get shoppingCartMock() {
    return {
      items: [
        {
          id: 'GR1',
          name: 'Green tea',
          price: 3.11,
          image: 'assets/images/green_tea.jpeg',
          quantity: 2,
        },
        {
          id: 'SR1',
          name: 'Strawberries',
          price: 5,
          image: 'assets/images/strawberry.jpeg',
          quantity: 2,
        },
        {
          id: 'CF1',
          name: 'Coffee',
          price: 11.23,
          image: 'assets/images/coffee.jpeg',
          quantity: 2,
        },
      ],
    };
  }
}
