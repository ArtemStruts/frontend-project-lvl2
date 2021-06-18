import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (data, formatStyle) => {
  if (formatStyle === 'stylish') {
    return stylish(data);
  } if (formatStyle === 'plain') {
    return plain(data);
  } if (formatStyle === 'json') {
    return json(data);
  }
  return 'Unexpected formatter.';
};

export default format;
