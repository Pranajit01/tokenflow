const test = require('node:test');
const assert = require('node:assert/strict');
const geminiService = require('../services/geminiService');

test('GeminiService — Fallback Parser Intent Analysis', () => {
  const resultSenior = geminiService.fallbackParser("My 82 year old grandmother needs medical help");
  assert.equal(resultSenior.priority.level, 'senior_citizen');

  const resultEmergency = geminiService.fallbackParser("Emergency! Critical accident");
  assert.equal(resultEmergency.priority.level, 'emergency');
});
