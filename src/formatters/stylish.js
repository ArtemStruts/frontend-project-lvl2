import _ from 'lodash';

const types = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  nested: '  ',
};
const replacer = ' ';

const currentIndent = (depth) => replacer.repeat(depth);

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const lines = Object
    .entries(currentValue)
    .flatMap(([key, val]) => `${currentIndent(depth + 8)}${key}: ${stringify(val, depth + 4)}`);
  return ['{', ...lines, `${currentIndent(depth + 4)}}`].join('\n');
};

const stylish = (diffTree) => {
  const innerFormat = (innerDiffTree, depth) => {
    if (!_.isObject(innerDiffTree)) {
      return `${innerDiffTree}`;
    }
    const strings = innerDiffTree.map((node) => {
      if (node.type === 'nested') {
        return `${currentIndent(depth + 2)}${types[node.type]}${node.name}: ${innerFormat(node.children, depth + 4)}`;
      }
      if (node.type === 'changed') {
        return `${currentIndent(depth + 2)}${types.removed}${node.name}: ${stringify(node.value1, depth)}
${currentIndent(depth + 2)}${types.added}${node.name}: ${stringify(node.value2, depth)}`;
      }
      return `${currentIndent(depth + 2)}${types[node.type]}${node.name}: ${stringify(node.value, depth)}`;
    });
    return ['{', ...strings, `${currentIndent(depth)}}`].join('\n');
  };
  return [innerFormat(diffTree, 0)].join('\n');
};

export default stylish;
