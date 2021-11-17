import { module, test } from 'qunit';
import { visit, currentURL, click, render } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';


module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/');
    assert.dom('h1').hasText('All Products');

    assert.dom('[data-test-product_list]').exists();
    assert.dom('[data-test-product_list]')
    assert.equal(
      this.element.querySelectorAll('[data-test-product_list]').length,
      3
    );

    assert.dom('[data-test-product="Strawberries"]').exists();

    const input = assert.dom('[data-test-product="Strawberries"] [data-test-counter_input]');
    const increaseButton = '[data-test-product="Strawberries"] [data-test-counter_increase]';
    const descreaseButton = '[data-test-product="Strawberries"] [data-test-counter_decrease]';
    input.hasValue('1');
    await click(increaseButton);
    input.hasValue('2');
    assert.dom('[data-test-product="Strawberries"] [data-test-price_discount]').doesNotExist();
    await click(increaseButton);
    input.hasValue('3');
    assert.dom('[data-test-product="Strawberries"] [data-test-price_discount]').exists();
    await click(descreaseButton);
    input.hasValue('2');
    assert.dom('[data-test-product="Strawberries"] [data-test-price_discount]').doesNotExist();

    //we buy 2 items
    await click('[data-test-product="Strawberries"] [data-test-buy_button]');
    assert.dom('[data-test-navbar_counter]').hasText('1');
    assert.dom('[data-test-product="Strawberries"] [data-test-price_discount]').doesNotExist();


    await click('[data-test-navbar_counter]');
    assert.equal(currentURL(), '/cart');
    assert.dom('h1').hasText('Shopping Cart');

    assert.dom('[data-test-product="Strawberries"]').exists();
    assert.dom('[data-test-product="Strawberries"] [data-test-product_quantity="Strawberries"]').hasText('quantity: 2');
    assert.dom('[data-test-product="Strawberries"] [data-test-product_price="Strawberries"]').hasText('£5');
    assert.dom('[data-test-cart_total_price]').hasText('Total Price £10');

    await click('[data-test-cart_remove_button]');
    assert.dom('[data-test-product="Strawberries"]').doesNotExist();
    assert.dom('[data-test-cart_total_price]').hasText('Total Price £0');
  });
});
