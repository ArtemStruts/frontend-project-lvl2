import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parsersMap = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const parsers = (filepath) => {
  const data = fs.readFileSync(filepath);
  const extname = path.extname(filepath);
  const format = extname.slice(1);
  const parser = parsersMap[format];
  return parser(data);
};

export default parsers;
