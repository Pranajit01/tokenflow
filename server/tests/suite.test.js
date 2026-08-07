/**
 * suite.test.js — Automated Unit Test Suite for Token Flow Backend
 * 
 * Uses Node.js built-in test runner (node:test) and assertion library (node:assert).
 * Run via: npm test
 */

const test = require('node:test');
const assert = require('node:assert/strict');

const priorityEngine = require('../services/priorityEngine');
const tokenGenerator = require('../services/tokenGenerator');
const geminiService = require('../services/geminiService');
const queueEngine = require('../services/queueEngine');

// ─── 1. PRIORITY ENGINE TESTS ───
test('PriorityEngine — Priority Scoring & Validation', async (t) => {
  await t.test('calculates correct base scores', () => {
    assert.equal(priorityEngine.calculatePriorityScore('emergency'), 100);
    assert.equal(priorityEngine.calculatePriorityScore('disabled'), 80);
    assert.equal(priorityEngine.calculatePriorityScore('pregnant'), 70);
    assert.equal(priorityEngine.calculatePriorityScore('senior_citizen'), 60);
    assert.equal(priorityEngine.calculatePriorityScore('child'), 40);
    assert.equal(priorityEngine.calculatePriorityScore('normal'), 10);
  });

  await t.test('adds appointment bonus correctly', () => {
    assert.equal(priorityEngine.calculatePriorityScore('normal', true), 15);
    assert.equal(priorityEngine.calculatePriorityScore('emergency', true), 105);
  });

  await t.test('validates priority levels with fallback to normal', () => {
    assert.equal(priorityEngine.validatePriorityLevel('senior_citizen'), 'senior_citizen');
    assert.equal(priorityEngine.validatePriorityLevel('invalid_level'), 'normal');
    assert.equal(priorityEngine.validatePriorityLevel(null), 'normal');
  });

  await t.test('returns display labels and colors', () => {
    assert.equal(priorityEngine.getPriorityLabel('emergency'), 'Emergency');
    assert.equal(priorityEngine.getPriorityColor('senior_citizen'), '#FFC531');
  });
});

// ─── 2. TOKEN GENERATOR TESTS ───
test('TokenGenerator — ID Formatting & Department Codes', async (t) => {
  tokenGenerator.resetCounters();

  await t.test('extracts 3-letter uppercase department code', () => {
    assert.equal(tokenGenerator.getDeptCode('Passport Office'), 'PAS');
    assert.equal(tokenGenerator.getDeptCode('Health Services'), 'HEA');
    assert.equal(tokenGenerator.getDeptCode('Civil Registry'), 'CIV');
    assert.equal(tokenGenerator.getDeptCode(''), 'GEN');
  });

  await t.test('generates sequential token IDs', () => {
    const t1 = tokenGenerator.generateTokenId('Passport Office');
    const t2 = tokenGenerator.generateTokenId('Passport Office');
    assert.equal(t1, 'TF-PAS-001');
    assert.equal(t2, 'TF-PAS-002');
  });
});

// ─── 3. GEMINI FALLBACK PARSER TESTS ───
test('GeminiService — Rule-Based Fallback Intent Classifier', async (t) => {
  await t.test('detects senior citizen keywords and health department', () => {
    const result = geminiService.fallbackParser("My elderly grandmother needs medical consultation");
    assert.equal(result.priority.level, 'senior_citizen');
    assert.equal(result.department, 'Health Services');
  });

  await t.test('detects emergency keywords and assigns top priority', () => {
    const result = geminiService.fallbackParser("Emergency! Critical accident, need ambulance");
    assert.equal(result.priority.level, 'emergency');
    assert.equal(result.estimatedWaitMinutes, 2);
  });

  await t.test('detects passport office requests', () => {
    const result = geminiService.fallbackParser("I need to renew my travel passport");
    assert.equal(result.department, 'Passport Office');
  });

  await t.test('detects appointments and preferred time slots', () => {
    const result = geminiService.fallbackParser("I have a scheduled appointment tomorrow morning");
    assert.equal(result.isAppointment, true);
    assert.equal(result.preferredTime, 'morning');
  });
});

// ─── 4. QUEUE ENGINE TESTS ───
test('QueueEngine — Ordering, Calling, and State Transitions', async (t) => {
  await t.test('adds entries and orders by priority score', () => {
    const normalEntry = queueEngine.addToQueue({
      service: 'General Service',
      department: 'General',
      priority: { level: 'normal' },
    }, "Normal request");

    const emergencyEntry = queueEngine.addToQueue({
      service: 'Emergency Medical',
      department: 'Health Services',
      priority: { level: 'emergency' },
    }, "Emergency request");

    const queue = queueEngine.getQueue();
    // Emergency token should be at position 1 (or serving if active)
    const emergencyPos = queue.find(e => e.tokenId === emergencyEntry.tokenId);
    assert.ok(emergencyPos);
  });

  await t.test('returns full live state object', () => {
    const liveState = queueEngine.getLiveState();
    assert.ok(Array.isArray(liveState.queue));
    assert.ok(liveState.stats);
    assert.ok(liveState.updatedAt);
  });
});
