import _ from 'lodash';

const types = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  nested: '  ',
};
const replacer = ' ';

const currentIndent = (depth) => replacer.repeat(depth);
const bracketIndent = (depth) => replacer.repeat(depth);

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const lines = Object
    .entries(currentValue)
    .flatMap(([key, val]) => `${currentIndent(depth + 8)}${key}: ${stringify(val, depth + 4)}`);
  return ['{', ...lines, `${bracketIndent(depth + 4)}}`].join('\n');
};

const stylish = (diffTree) => {
  const innerFormat = (innerDiffTree, depth) => {
    if (!_.isObject(innerDiffTree)) {
      return `${innerDiffTree}`;
    }
    const strings = innerDiffTree.map((node) => {
      let res = '';
      if (node.type === 'added') {
        res = `${currentIndent(depth + 2)}${types[node.type]}${node.name}: ${stringify(node.value, depth)}`;
      }
      if (node.type === 'removed') {
        res = `${currentIndent(depth + 2)}${types[node.type]}${node.name}: ${stringify(node.value, depth)}`;
      }
      if (node.type === 'unchanged') {
        res = `${currentIndent(depth + 2)}${types[node.type]}${node.name}: ${stringify(node.value, depth)}`;
      }
      if (node.type === 'changed') {
        res = [
          `${currentIndent(depth + 2)}${types.removed}${node.name}: ${stringify(node.value1, depth)}`,
          `${currentIndent(depth + 2)}${types.added}${node.name}: ${stringify(node.value2, depth)}`].join('\n');
      }
      if (node.type === 'nested') {
        res = `${currentIndent(depth + 2)}${types[node.type]}${node.name}: ${innerFormat(node.children, depth + 4)}`;
      } return res;
    });
    return ['{', ...strings, `${bracketIndent(depth)}}`].join('\n');
  };
  return [innerFormat(diffTree, 0)].join('\n');
};

export default stylish;
