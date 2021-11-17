import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CartComponent extends Component {
  @service shoppingCart;

  constructor(...args) {
    super(...args);
  }

  get totalPrice() {
    return this.shoppingCart.items.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
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
