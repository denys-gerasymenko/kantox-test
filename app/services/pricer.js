import Service from '@ember/service';

export default class PricerService extends Service {
  productDiscounts = {
    GR1: {
      quantityForDiscount: 1,
      discount: this.getTeaDiscount,
      hasDiscount: false,
    },
    SR1: {
      quantityForDiscount: 3,
      discount: this.getStrawberryDiscount,
      hasDiscount: false,
    },
    CF1: {
      quantityForDiscount: 3,
      discount: this.getCoffeeDiscount,
      hasDiscount: false,
    },
  };

  setProductWithDiscount(product, quantity) {
    const productSettings = this.productDiscounts[product.id];

    if (quantity >= productSettings.quantityForDiscount) {
      return this.setDiscount(product, true);
    } else {
      productSettings.hasDiscount = false;
      return null;
    }
  }

  setDiscount(product, hasDiscount = false) {
    this.productDiscounts[product.id].hasDiscount = hasDiscount;

    if (hasDiscount) {
      const discount = this.productDiscounts[product.id].discount(product);
      return discount;
    } else {
      return product;
    }
  }

  getProductDiscount(product) {
    const productSettings = this.productDiscounts[product.id];
    return productSettings.hasDiscount && productSettings.discount(product);
  }

  getTeaDiscount({ quantity }) {
    return { quantity: quantity * 2 };
  }

  getStrawberryDiscount({ price }) {
    return { price: price - 0.5 };
  }

  getCoffeeDiscount({ price }) {
    return { price: ((price / 100) * 66 ).toFixed(2)};
  }
}
