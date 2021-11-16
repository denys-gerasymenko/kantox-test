import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service('pricer') pricerService;
  @service shoppingCart;

  async model() {
    const products = this.pricerService.setDiscounts(this.shoppingCart.items);
    return products;
  }
}
