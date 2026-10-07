import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, filterSkills } from '../src/domain/portfolio.js';
import { projects } from '../src/data/projects.js';

const groups = [
  { id: 1, category: 'languages', title: 'Programming languages', skills: [{ id: 1, label: 'Java' }, { id: 2, label: 'JavaScript' }, { id: 3, label: 'SQL' }] },
  { id: 2, category: 'data', title: 'Database management', skills: [{ id: 4, label: 'MySQL' }, { id: 5, label: 'SQL Server' }] },
];
test('project category selection works for current content and future additions', () => {
  const selected = filterProjects(Object.values(projects), 'mobile');
  assert.deepEqual(selected.map(p => p.id), ['animarket']);
  assert.match(selected[0].label, /MOBILE DEVELOPER/);
  assert.equal(filterProjects(Object.values(projects)).length, 1);
  const extended = [...Object.values(projects), { id: 'future-system', category: 'systems' }];
  assert.deepEqual(filterProjects(extended, 'systems').map(p => p.id), ['future-system']);
  assert.deepEqual(filterProjects(Object.values(projects), 'unknown'), []);
});
test('skill search combines category and query rather than overriding either', () => {
  const result = filterSkills(groups, { category: 'data', query: '  sQl  ' });
  assert.equal(result.length, 1);
  assert.deepEqual(result[0].skills.map(s => s.label), ['MySQL', 'SQL Server']);
  assert.deepEqual(filterSkills(groups, { category: 'data', query: 'Java' }), []);
});
test('matching a group title reveals all its skills without mutating the source', () => {
  const before = structuredClone(groups);
  const result = filterSkills(groups, { query: 'database' });
  assert.equal(result[0].skills.length, 2);
  assert.deepEqual(groups, before);
  assert.notEqual(result[0], groups[1]);
});
test('empty and unmatched searches give recoverable results', () => {
  assert.equal(filterSkills(groups, { query: '  ' }).length, 2);
  assert.deepEqual(filterSkills(groups, { query: 'no such skill' }), []);
  assert.deepEqual(filterSkills([], { query: 'Java' }), []);
});
