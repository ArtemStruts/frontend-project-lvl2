import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const expectedResult = (formatter) => fs.readFileSync(getFixturePath(`result${formatter}.txt`), 'utf-8');

const filepathYML1 = getFixturePath('file1.yml');
const filepathYML2 = getFixturePath('file2.yml');
const filepathJSON1 = getFixturePath('file1.json');
const filepathJSON2 = getFixturePath('file2.json');

test('nested data default', () => {
  expect(genDiff(filepathYML1, filepathYML2)).toEqual(expectedResult('Stylish').trim());
  expect(genDiff(filepathJSON1, filepathJSON2)).toEqual(expectedResult('Stylish').trim());
});

test('nested data stylish', () => {
  expect(genDiff(filepathYML1, filepathYML2, 'stylish')).toEqual(expectedResult('Stylish').trim());
  expect(genDiff(filepathJSON1, filepathJSON2, 'stylish')).toEqual(expectedResult('Stylish').trim());
});

test('nested data plain', () => {
  expect(genDiff(filepathYML1, filepathYML2, 'plain')).toEqual(expectedResult('Plain').trim());
  expect(genDiff(filepathJSON1, filepathJSON2, 'plain')).toEqual(expectedResult('Plain').trim());
});

test('nested data json', () => {
  expect(genDiff(filepathYML1, filepathYML2, 'json')).toEqual(expectedResult('JSON').trim());
  expect(genDiff(filepathJSON1, filepathJSON2, 'json')).toEqual(expectedResult('JSON').trim());
});

test('unexpected formatter', () => {
  expect(() => genDiff(filepathJSON1, filepathYML2, 'error')).toThrow();
});

test('unexpected extname', () => {
  expect(() => genDiff(filepathYML1, getFixturePath('resultStylish.txt'))).toThrow();
});
