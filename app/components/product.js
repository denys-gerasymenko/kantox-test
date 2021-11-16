import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const MINIMUM_QUANTITY = 1;

export default class ProductComponent extends Component {
  @service shoppingCart;
  @service('pricer') pricerService;
  @tracked product = this.args.product;
  @tracked quantity = MINIMUM_QUANTITY;

  addToCart = () => {
    const { product } = this.args;
    const productInShoppingCart = this.shoppingCart.items.find((p) => {
      return p.id === product.id;
    });

    if (productInShoppingCart) {
      productInShoppingCart.quantity += this.quantity;
    } else {
      product.quantity = this.quantity;
      this.shoppingCart.add(product);
    }
  };

  changeQuantity = (quantity) => {
    const newQuantity = this.quantity + quantity;

    if (newQuantity < MINIMUM_QUANTITY) {
      return;
    } else {
      this.quantity = newQuantity;
    }

    this.pricerService.changeBuyingCounter(this.product, this.quantity);
    this.product = this.pricerService.getProductWithDiscount(this.product);
  }
}
