import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | card', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /card', async function (assert) {
    await visit('/card');

    assert.equal(currentURL(), '/card');
  });
});
