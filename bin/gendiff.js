#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'fs';
// import path from 'path';
import genDiff from '../src/genDiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')

program
  .option('-f, --format [type]', 'output format')

program
  .arguments('<filepath1> <filepath2>')

program
  .action((filepath1, filepath2) => {
    const jsonData1 = readFileSync(filepath1);
    const jsonData2 = readFileSync(filepath2);
    const jsonParse1 = JSON.parse(jsonData1);
    const jsonParse2 = JSON.parse(jsonData2);
    const result = genDiff(jsonParse1, jsonParse2);
    console.log(result);
  }) 

program.parse()
