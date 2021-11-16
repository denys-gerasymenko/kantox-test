import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service('pricer') pricerService;

  async model() {
    const response = await fetch('/api/product_list.json');
    const { data } = await response.json();
    const products = this.pricerService.setDiscounts(data);
    return products;
  }
}
