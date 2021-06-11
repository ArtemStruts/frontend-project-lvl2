import _ from 'lodash';

export default (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.uniq(keys1.concat(keys2)).sort();
  if (keys.length === 0) {
    return '{}';
  } 
    const result = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      acc.push(`  - ${key}: ${obj1[key]}`);
      return acc;
    } if (!_.has(obj1, key) && _.has(obj2, key)) {
      acc.push(`  + ${key}: ${obj2[key]}`);
      return acc;
    } if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        acc.push(`    ${key}: ${obj1[key]}`);
        return acc;
      }
      acc.push(`  - ${key}: ${obj1[key]}`);
      acc.push(`  + ${key}: ${obj2[key]}`);
    } return acc;
  }, ['{']);
  result.push('}');
  return result.join('\n');
};
