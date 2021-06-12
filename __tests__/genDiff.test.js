import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const expectedResultYML = fs.readFileSync(getFixturePath('resultYML.txt'), 'utf-8');
const dataYML1 = parsers(getFixturePath('file1.yml'));
const dataYML2 = parsers(getFixturePath('file2.yml'));
const currentResultYML = genDiff(dataYML1, dataYML2);

const expectedResultJSON = fs.readFileSync(getFixturePath('resultYML.txt'), 'utf-8');
const dataJSON1 = parsers(getFixturePath('file1.json'));
const dataJSON2 = parsers(getFixturePath('file2.json'));
const currentResultJSON = genDiff(dataJSON1, dataJSON2);

test('flat data', () => {
  expect(currentResultYML).toEqual(expectedResultYML);
  expect(currentResultJSON).toEqual(expectedResultJSON);
});
