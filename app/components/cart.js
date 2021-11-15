import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CartComponent extends Component {
    @service shoppingCart;
    @service('pricer') pricerService;
    @tracked product;

    constructor(...args) {
        super(...args);

        this.products = this.pricerService.getProductWithDiscount(this.args.product);
    }

    removeFromCart = (productId) => {
        if (!productId) {
        return;
        }

        const productFromCart = this.shoppingCart.items.find(
        (p) => p.id === productId
        );

        if (productFromCart) {
        this.shoppingCart.remove(productFromCart);
        }
    };

    get shoppingCartMock() {
        return {
        items: [
            {
            id: 'GR1',
            name: 'Green tea',
            price: 3.11,
            image: 'assets/images/green_tea.jpeg',
            },
            {
            id: 'SR1',
            name: 'Strawberries',
            price: 5,
            image: 'assets/images/strawberry.jpeg',
            },
            {
            id: 'CF1',
            name: 'Coffee',
            price: 11.23,
            image: 'assets/images/coffee.jpeg',
            },
        ],
        };
    }
}
