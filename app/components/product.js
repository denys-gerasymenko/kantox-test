import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ProductComponent extends Component {
  @service shoppingCart;
  @service('pricer') pricerService;
  @tracked product = this.args.product;

  constructor(...args) {
    super(...args);
    console.log(this.product);
  }

  addToCart = () => {
    const { product } = this.args;
    const productInShoppingCart = this.shoppingCart.items.find((p) => {
      return p.id === product.id;
    });

    if (productInShoppingCart) {
      this.pricerService.incrementBuyingCounter(product);
      this.product = this.pricerService.getProductWithDiscount(product);
      productInShoppingCart.quantity++;
    } else {
      product.quantity = 1;
      this.shoppingCart.add(product);
    }
  };
}
