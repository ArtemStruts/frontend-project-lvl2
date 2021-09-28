import _ from 'lodash';

const keysCheckMap = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])),
    action: (obj1, obj2, fn) => ({ children: fn(obj1, obj2) }),
  },
  {
    type: 'removed',
    check: (_obj1, obj2, key) => (!_.has(obj2, key)),
    action: (value1) => ({ value: value1 }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] === obj2[key])),
    action: (_value1, value2) => ({ value: value2 }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] !== obj2[key])),
    action: (value1, value2) => ({ value1, value2 }),
  },
  {
    type: 'added',
    check: (obj1, _obj2, key) => (!_.has(obj1, key)),
    action: (_value1, value2) => ({ value: value2 }),
  },
];

const getDiffTree = (obj1 = {}, obj2 = {}) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.uniq(keys1.concat(keys2)));
  return keys.map((key) => {
    const { type, action } = keysCheckMap.find((item) => item.check(obj1, obj2, key));
    const {
      value,
      value1,
      value2,
      children,
    } = action(obj1[key], obj2[key], getDiffTree);
    return {
      name: key,
      type,
      value,
      value1,
      value2,
      children,
    };
  });
};

export default getDiffTree;
