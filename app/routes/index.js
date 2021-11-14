import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    const response = await fetch('/api/product_list.json');
    const { data } = await response.json();
    return data;
  }
}
