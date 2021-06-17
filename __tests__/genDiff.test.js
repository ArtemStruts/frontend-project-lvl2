import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';
import parsers from '../src/parsers.js';
import format from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const expectedResultYML = fs.readFileSync(getFixturePath('resultYML.txt'), 'utf-8');
const expectedResultYMLPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const dataYML1 = parsers(getFixturePath('file1.yml'));
const dataYML2 = parsers(getFixturePath('file2.yml'));
const currentResultYML = format(genDiff(dataYML1, dataYML2), 'stylish');
const currentResultYMLPlain = format(genDiff(dataYML1, dataYML2), 'plain');

const expectedResultJSON = fs.readFileSync(getFixturePath('resultYML.txt'), 'utf-8');
const expectedResultJSONPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const dataJSON1 = parsers(getFixturePath('file1.json'));
const dataJSON2 = parsers(getFixturePath('file2.json'));
const currentResultJSON = format(genDiff(dataJSON1, dataJSON2), 'stylish');
const currentResultJSONPlain = format(genDiff(dataJSON1, dataJSON2), 'plain');

test('nested data stylish', () => {
  expect(currentResultYML).toEqual(expectedResultYML);
  expect(currentResultJSON).toEqual(expectedResultJSON);
});

test('nested data plain', () => {
  expect(currentResultYMLPlain).toEqual(expectedResultYMLPlain);
  expect(currentResultJSONPlain).toEqual(expectedResultJSONPlain);
});
