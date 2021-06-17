import getDiffTree from './genDiff.js';
import parsers from './parsers.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parsers(filepath1);
  const data2 = parsers(filepath2);
  const diffTree = getDiffTree(data1, data2);
  return format(diffTree, formatName);
};

export default genDiff;
