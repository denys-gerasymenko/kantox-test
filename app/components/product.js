import Component from '@glimmer/component';

export default class ProductComponent extends Component {
  get image() {
    return `assets/images/${this.args.product.image}`;
  }
}
