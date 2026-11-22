import test from 'node:test';
import assert from 'node:assert/strict';

test('Colitis support content and resources are available locally without a backend', async () => {
  const content = await import('../src/data/colitisContent.ts');
  assert.ok(content.FAQS.length >= 5, 'the FAQ page has curated offline answers');
  assert.ok(content.RESOURCES.length >= 4, 'the resources page has curated offline links');
  assert.ok(content.RESOURCES.every((item) => item.url.startsWith('https://')));
});

test('resource search filters local entries by title, description, and category', async () => {
  const { RESOURCES, filterResources } = await import('../src/data/colitisContent.ts');
  assert.deepEqual(filterResources(RESOURCES, 'helpline').map((item) => item.id), ['ccuk-helpline']);
});

test('feedback saves only to local device storage and does not claim remote delivery', async () => {
  const { saveSuggestion, SUGGESTIONS_STORAGE_KEY } = await import('../src/data/colitisContent.ts');
  const values = new Map<string, string>();
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
  assert.equal(saveSuggestion({ title: 'Add a gentle meal idea', body: 'More low-effort options', category: 'feature' }, storage), true);
  const saved = JSON.parse(values.get(SUGGESTIONS_STORAGE_KEY) ?? '[]');
  assert.equal(saved.length, 1);
  assert.equal(saved[0].title, 'Add a gentle meal idea');
  assert.equal(saved[0].body, 'More low-effort options');
  assert.equal(saved[0].category, 'feature');
});

test('empty feedback is rejected without changing saved suggestions', async () => {
  const { saveSuggestion, SUGGESTIONS_STORAGE_KEY } = await import('../src/data/colitisContent.ts');
  const values = new Map<string, string>();
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
  assert.equal(saveSuggestion({ title: '  ', body: 'No title', category: 'other' }, storage), false);
  assert.equal(values.has(SUGGESTIONS_STORAGE_KEY), false);
});
