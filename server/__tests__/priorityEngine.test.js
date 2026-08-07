const test = require('node:test');
const assert = require('node:assert/strict');
const priorityEngine = require('../services/priorityEngine');

test('PriorityEngine — Base Scores', () => {
  assert.equal(priorityEngine.calculatePriorityScore('emergency'), 100);
  assert.equal(priorityEngine.calculatePriorityScore('disabled'), 80);
  assert.equal(priorityEngine.calculatePriorityScore('pregnant'), 70);
  assert.equal(priorityEngine.calculatePriorityScore('senior_citizen'), 60);
  assert.equal(priorityEngine.calculatePriorityScore('child'), 40);
  assert.equal(priorityEngine.calculatePriorityScore('normal'), 10);
});

test('PriorityEngine — Appointment Bonus', () => {
  assert.equal(priorityEngine.calculatePriorityScore('normal', true), 15);
  assert.equal(priorityEngine.calculatePriorityScore('emergency', true), 105);
});

test('PriorityEngine — Level Validation', () => {
  assert.equal(priorityEngine.validatePriorityLevel('senior_citizen'), 'senior_citizen');
  assert.equal(priorityEngine.validatePriorityLevel('unknown'), 'normal');
});
