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
      let string = '';
      switch (node.type) {
        case 'added': {
          const value = formatValue(node.value);
          string = `Property '${name.flat(Infinity).join('.')}' was added with value: ${value}`;
          break;
        }
        case 'removed':
          string = `Property '${name.flat(Infinity).join('.')}' was removed`;
          break;
        case 'changed': {
          const value1 = formatValue(node.value1);
          const value2 = formatValue(node.value2);
          string = `Property '${name.flat(Infinity).join('.')}' was updated. From ${value1} to ${value2}`;
          break;
        }
        case 'nested':
          return innerFormat(node.children, name);
        default:
          return false;
      } return string;
    });
    return [...strings].filter(Boolean).join('\n');
  };
  return [innerFormat(diffTree, [])].join('\n');
};

export default plain;
