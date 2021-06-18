import _ from 'lodash';

const getDiffTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.uniq(keys1.concat(keys2)).sort();
  const result = keys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      acc.push({
        name: key,
        type: 'nested',
        children: getDiffTree(obj1[key], obj2[key]),
      });
      return acc;
    }
    if (!_.has(obj2, key)) {
      acc.push({
        name: key,
        type: 'removed',
        value: obj1[key],
      });
    } if (!_.has(obj1, key)) {
      acc.push({
        name: key,
        type: 'added',
        value: obj2[key],
      });
    } if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        acc.push({
          name: key,
          type: 'unchanged',
          value: obj2[key],
        });
      } else {
        acc.push({
          name: key,
          type: 'changed',
          value1: obj1[key],
          value2: obj2[key],
        });
      }
    } return acc;
  }, []);
  return result;
};

export default getDiffTree;
