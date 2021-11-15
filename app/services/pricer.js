import Service from '@ember/service';

const rules = Object.freeze({
    GR1: {
        quantityForDiscount: 1,
        discount: {
            quantity: 2,
        }
    },
    SR1: {
        quantityForDiscount: 3,
        discount: {
            priceInteger: 0.5,
        }
    },
    CF1: {
        quantityForDiscount: 3,
        discount: {
            pricePercent: 66
        }
    },
});

export default class PricerService extends Service {
    buyingCounter = {
        GR1: 0,
        SR1: 0,
        CF1: 0,
    };

    getProductWithDiscount(product) {
        const productRules = rules[product.id];

        if (productRules.quantityForDiscount <= this.buyingCounter[product.id]) {
            const productWithDiscount = {};

            if (productRules.discount.quantity) {
                productWithDiscount.quantity = productRules.discount.quantity + parseInt(product.quantity);
            } else if (productRules.discount.priceInteger) {
                productWithDiscount.price = (
                    productRules.discount.priceInteger + parseFloat(product.price)
                );
            } else if (productRules.discount.pricePercent) {
                productWithDiscount.price = (
                    product.price - (product.price / 100 * productRules.discount.pricePercent)
                ).toFixed(2);
            }

            return product = {
                ...product,
                ...productWithDiscount
            };
        } else {
            return product;
        }
    }

    incrementBuyingCounter(product) {
        if (this.buyingCounter[product.id] !== undefined) {
            this.buyingCounter[product.id] += 1;
        }
    }
}
