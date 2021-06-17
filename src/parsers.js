import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parsers = (filepath) => {
  const data = fs.readFileSync(filepath);
  const format = path.extname(filepath);
  if (format === '.json') {
    return JSON.parse(data);
  } if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  } return 'Unsupported format.';
};

export default parsers;
