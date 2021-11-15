import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ProductComponent extends Component {
  @service shoppingCart;

  get image() {
    return `assets/images/${this.args.product.image}`;
  }

  addToCart = () => {
    this.shoppingCart.add(this.args.product);
  };
}
