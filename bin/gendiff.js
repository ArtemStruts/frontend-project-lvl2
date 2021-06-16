#!/usr/bin/env node

import { program } from 'commander';
// import path from 'path';
import parsers from '../src/parsers.js';
import genDiff from '../src/genDiff.js';
import format from '../src/formatters/stylish.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const result = genDiff(parsers(filepath1), parsers(filepath2));
    console.log(format(result));
  });

program.parse(process.argv);
