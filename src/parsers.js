import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parsers = (filepath) => {
  const data = fs.readFileSync(filepath);
  const format = path.extname(filepath);
  let parserData;
  if (format === '.json') {
    parserData = JSON.parse(data);
  } if (format === '.yml' || format === '.yaml') {
    parserData = yaml.load(data);
  } return parserData;
};

export default parsers;
