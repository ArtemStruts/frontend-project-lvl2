#!/usr/bin/env node

import { program } from 'commander';
// import path from 'path';
import genDiff from '../src/genDiff.js';
import parsers from '../src/parsers.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.');

program
  .option('-f, --format [type]', 'output format');

program
  .arguments('<filepath1> <filepath2>');

program
  .action((filepath1, filepath2) => {
    const result = genDiff(parsers(filepath1), parsers(filepath2));
    console.log(result);
  });

program.parse();
