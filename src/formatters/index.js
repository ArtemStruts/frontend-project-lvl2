import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (data, formatStyle) => {
  switch (formatStyle) {
    case 'stylish': {
      return stylish(data);
    }
    case 'plain': {
      return plain(data);
    }
    case 'json': {
      return json(data);
    }
    default:
      throw new Error('Unexpected formatter.');
  }
};

export default format;
