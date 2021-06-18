import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  } return value;
};

const plain = (diffTree) => {
  const innerFormat = (innerDiffTree, parentName) => {
    const strings = innerDiffTree.flatMap((node) => {
      let res = [];
      const name = [parentName];
      name.push(node.name);

      if (node.type === 'added') {
        const value = formatValue(node.value);
        res = `Property '${name.flat(Infinity).join('.')}' was added with value: ${value}`;
      }
      if (node.type === 'removed') {
        res = `Property '${name.flat(Infinity).join('.')}' was removed`;
      }
      if (node.type === 'changed') {
        const value1 = formatValue(node.value1);
        const value2 = formatValue(node.value2);
        res = `Property '${name.flat(Infinity).join('.')}' was updated. From ${value1} to ${value2}`;
      }
      if (node.type === 'nested') {
        res = innerFormat(node.children, name);
      } return res;
    });
    return [...strings].join('\n');
  };
  return [innerFormat(diffTree, [])].join('\n');
};

export default plain;
