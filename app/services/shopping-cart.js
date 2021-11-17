import { A } from '@ember/array';
import Service from '@ember/service';

export default class ShoppingCartService extends Service {
  items = A([]);

  add(item) {
    this.items.pushObject(item);
  }

  getProductById(id) {
    return this.items.find((product) => {
      return product.id === id;
    });
  }

  remove(item) {
    this.items.removeObject(item);
  }

  empty() {
    this.items.clear();
  }
}
