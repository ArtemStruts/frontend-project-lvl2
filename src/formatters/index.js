import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatStyle) => {
  if (formatStyle === 'stylish') {
    return stylish(data);
  } if (formatStyle === 'plain') {
    return plain(data);
  } return 'Unexpected formatter.';
};

export default format;
