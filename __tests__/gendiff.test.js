import fs from 'fs';
import path from 'path';

import genDiff from '../src/index.js';

const getFixturePath = (filename) => (
  path.join(__dirname, '__fixtures__', filename)
);

const readFile = (filename) => (
  fs.readFileSync(getFixturePath(filename), 'utf-8')
);

const resultTree = readFile('result-tree.txt');
const resultPlain = readFile('result-plain.txt');
const resultJson = readFile('result-json.json');

describe.each`
  ext        
  ${'.json'}
  ${'.yml'}
  ${'.ini'}
`('compare $ext files', ({ ext }) => {
  const pathBefore = getFixturePath(`before${ext}`);
  const pathAfter = getFixturePath(`after${ext}`);

  test('diff format "tree"', () => {
    expect(genDiff(pathBefore, pathAfter, 'tree')).toBe(resultTree);
  });

  test('diff format "plain"', () => {
    expect(genDiff(pathBefore, pathAfter, 'plain')).toBe(resultPlain);
  });

  test('diff format "json"', () => {
    expect(genDiff(pathBefore, pathAfter, 'json')).toBe(resultJson);
  });
});
