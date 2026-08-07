const test = require('node:test');
const assert = require('node:assert/strict');
const queueEngine = require('../services/queueEngine');

test('QueueEngine — Queue Operations', () => {
  const token1 = queueEngine.addToQueue({
    service: 'General Consultation',
    department: 'General',
    priority: { level: 'normal' },
  }, "General inquiry");

  assert.ok(token1.tokenId);
  assert.equal(token1.status, 'waiting');

  const liveState = queueEngine.getLiveState();
  assert.ok(Array.isArray(liveState.queue));
  assert.ok(liveState.stats);
});
