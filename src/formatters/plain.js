import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  } return value;
};

const plain = (diffTree) => {
  const innerFormat = (innerDiffTree, parentName) => {
    const strings = innerDiffTree.flatMap((node) => {
      const name = parentName.concat([node.name]);
      switch (node.type) {
        case 'added': {
          const value = formatValue(node.value);
          return `Property '${name.flat(Infinity).join('.')}' was added with value: ${value}`;
        }
        case 'removed':
          return `Property '${name.flat(Infinity).join('.')}' was removed`;
        case 'changed': {
          const value1 = formatValue(node.value1);
          const value2 = formatValue(node.value2);
          return `Property '${name.flat(Infinity).join('.')}' was updated. From ${value1} to ${value2}`;
        }
        case 'nested':
          return innerFormat(node.children, name);
        default:
          return false;
      }
    });
    return [...strings].filter(Boolean).join('\n');
  };
  return [innerFormat(diffTree, [])].join('\n');
};

export default plain;
