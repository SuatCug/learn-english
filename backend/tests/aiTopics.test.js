// AI konu kartları (data/aiTopics.js): her konunun Türkçe başlık/açıklaması var mı, karta gidiyor mu.
const test = require('node:test');
const assert = require('node:assert/strict');
const { AI_TOPICS, LEVELS, publicTopics } = require('../data/aiTopics');

test('her AI konusunun Türkçe başlığı ve açıklaması var', () => {
  for (const level of LEVELS) {
    for (const topic of publicTopics(level)) {
      assert.ok(topic.titleTr, `${level}/${topic.slug} başlık`);
      assert.ok(topic.descriptionTr, `${level}/${topic.slug} açıklama`);
    }
  }
});

test('kartlara senaryo ve ilk mesaj gitmez', () => {
  for (const level of LEVELS) {
    for (const topic of publicTopics(level)) {
      assert.equal(topic.scenario, undefined);
      assert.equal(topic.opener, undefined);
    }
  }
  assert.ok(Object.values(AI_TOPICS).every((list) => list.length > 0));
});
