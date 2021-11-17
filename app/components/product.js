import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const MINIMUM_QUANTITY = 1;

export default class ProductComponent extends Component {
  @service shoppingCart;
  @service('pricer') pricerService;
  @tracked product = this.args.product;
  @tracked quantity = MINIMUM_QUANTITY;
  @tracked hasDiscount = false;
  @tracked discountPrice = 0;
  @tracked productWithDiscount = null;

  constructor(...args) {
    super(...args);
    this.setProduct();
  }

  setProduct() {
    const productFromCart = this.productFromCart;

    if (productFromCart) {
      const quantity = productFromCart.quantity;
      this.productWithDiscount = this.pricerService.setProductWithDiscount(this.product, quantity);
    }
  }

  addToCart = () => {
    const productFromCart = this.productFromCart;

    if (productFromCart) {
      productFromCart.quantity += this.quantity;
      this.productWithDiscount = this.pricerService.setProductWithDiscount(this.product, productFromCart.quantity);
    } else {
      this.product.quantity += this.quantity;
      this.shoppingCart.add(this.product);
    }
  };

  get productFromCart() {
    return this.shoppingCart.getProductById(this.product.id) || null;
  }

  changeQuantity = (quantity) => {
    const newQuantity = this.quantity + quantity;

    if (newQuantity < MINIMUM_QUANTITY) {
      return;
    } else {
      this.quantity = newQuantity;
    }

    this.productWithDiscount = this.pricerService.setProductWithDiscount(this.product, this.quantity + this.productFromCart.quantity);
  };
}
