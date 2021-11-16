import Service from '@ember/service';

export default class PricerService extends Service {
  productDiscounts = {
    GR1: {
      quantityForDiscount: 1,
      discountFunction: this.getTeaDiscount,
      counter: 0,
      discount: null,
    },
    SR1: {
      quantityForDiscount: 3,
      discountFunction: this.getStrawberryDiscount,
      counter: 0,
      discount: null,
    },
    CF1: {
      quantityForDiscount: 3,
      discountFunction: this.getCoffeeDiscount,
      counter: 0,
      discount: null,
    },
  };

  useDiscount(productSettings, product) {
    let discount;
    if (typeof productSettings.discount === 'function') {
      discount = productSettings.discount(product);
    } else {
      discount = productSettings.discount;
    }

    product.originalPrice = product.price;

    return {
      ...product,
      ...discount,
    };
  }

  getProductWithDiscount(product) {
    const productSettings = this.productDiscounts[product.id];
    
    if (productSettings.discount) {
      return this.useDiscount(productSettings, product);
    }

    if (productSettings.counter === productSettings.quantityForDiscount) {
      productSettings.discount = productSettings.discountFunction(product);
      return this.useDiscount(productSettings, product);
    } else if (product.originalPrice) {
      product.price = product.originalPrice;
    }

    return product;
  }

  getTeaDiscount() {
    return ({ quantity }) => {
      return { quantity: quantity * 2 };
    };
  }

  getStrawberryDiscount({ price }) {
    return { price: price - 0.5 };
  }

  getCoffeeDiscount({ price }) {
    return { price: price - (price / 100) * 66 };
  }

  changeBuyingCounter(product, count) {
    const productSettings = this.productDiscounts[product.id];
    if (productSettings.counter !== undefined) {
      productSettings.counter = count;

      if (productSettings.counter < productSettings.quantityForDiscount) {
        productSettings.discount = null;
      }
    }
  }

  setDiscounts(products) {
    return products.map((p) => {
      return this.getProductWithDiscount(p);
    });
  }
}
