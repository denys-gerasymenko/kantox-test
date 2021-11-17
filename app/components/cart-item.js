import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CartItemComponent extends Component {
    @service shoppingCart;
    @service pricer;
    @tracked product = this.args.product;
    @tracked productWithPrice = null;

    constructor(...args) {
        super(...args);

        const productFromCart = this.productFromCart;

        if (productFromCart) {
            const quantity = productFromCart.quantity;
            this.productWithDiscount = this.pricer.setProductWithDiscount(this.product, quantity);
        }
    }

    removeFromCart = (productId) => {
        if (!productId) {
          return;
        }
    
        const productFromCart = this.shoppingCart.getProductById(productId);
    
        if (productFromCart) {
          this.shoppingCart.remove(productFromCart);
          this.pricer.setDiscount(productFromCart, false);
          this.args.changeTotalPrice(-productFromCart.price * productFromCart.quantity);
        }
    };

    get productFromCart() {
        return this.shoppingCart.getProductById(this.product.id) || null;
    }
}
