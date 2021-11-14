import Component from '@glimmer/component';

export default class ProductComponent extends Component {
  constructor(...args) {
    super(...args);
    console.log(this.args.product);
  }
}
