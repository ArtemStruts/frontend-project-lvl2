import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

test('flat data', () => {
  const obj1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };
  const obj2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  };
  const result1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(obj1, obj2)).toEqual(result1);

  const obj3 = {};
  const result2 = `{
  - host: hexlet.io
  - timeout: 20
  - verbose: true
}`;
  expect(genDiff(obj2, obj3)).toEqual(result2);

  const result3 = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(obj3, obj2)).toEqual(result3);

  const result4 = `{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`;
  expect(genDiff(obj2, obj1)).toEqual(result4);
  expect(genDiff({}, {})).toEqual('{}');
});
