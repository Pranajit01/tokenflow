const test = require('node:test');
const assert = require('node:assert/strict');
const priorityEngine = require('../server/services/priorityEngine');
const tokenGenerator = require('../server/services/tokenGenerator');

test('Integration — Token Generation & Priority Assignment', () => {
  const token = tokenGenerator.generateTokenId('Health Services');
  const score = priorityEngine.calculatePriorityScore('emergency', true);

  assert.ok(token.startsWith('TF-HEA-'));
  assert.equal(score, 105);
});
