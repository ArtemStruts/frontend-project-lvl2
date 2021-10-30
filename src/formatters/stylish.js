import _ from 'lodash';

const types = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  nested: '  ',
};
const replacer = '  ';

const currentIndent = (depth) => replacer.repeat(depth);

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return currentValue;
  }

  const lines = Object
    .entries(currentValue)
    .flatMap(([key, val]) => `${currentIndent(depth + 4)}${key}: ${stringify(val, depth + 2)}`);
  return ['{', ...lines, `${currentIndent(depth + 2)}}`].join('\n');
};

const stylish = (diffTree) => {
  const innerFormat = (innerDiffTree, depth) => {
    const strings = innerDiffTree.map((node) => {
      const {
        name,
        type,
        value,
        value1,
        value2,
        children,
      } = node;

      switch (type) {
        case 'nested':
          return `${currentIndent(depth + 1)}${types[type]}${name}: ${innerFormat(children, depth + 2)}`;
        case 'changed':
          return `${currentIndent(depth + 1)}${types.removed}${name}: ${stringify(value1, depth)}
${currentIndent(depth + 1)}${types.added}${name}: ${stringify(value2, depth)}`;
        default:
          return `${currentIndent(depth + 1)}${types[type]}${name}: ${stringify(value, depth)}`;
      }
    });
    return ['{', ...strings, `${currentIndent(depth)}}`].join('\n');
  };
  return [innerFormat(diffTree, 0)].join('\n');
};

export default stylish;
