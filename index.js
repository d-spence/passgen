#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const log = console.log;
const {
  defLength,
  defFilename,
  defHasNumbers,
  defHasSymbols,
  defSave,
  pwSymbols,
} = require('./config/config');
const createPassword = require('./utils/createPassword');

program.version('1.0.0').description('Simple password generator');

// Command options
program
  .option('-l, --length <number>', 'length of password', defLength)
  .option('-n, --numbers [boolean]', 'include numbers', defHasNumbers)
  .option('-y, --symbols [boolean]', 'include symbols', defHasSymbols)
  .option('-u, --use-symbols <symbols>', 'use only specified symbols', pwSymbols)
  .option('-o, --use-only <characters>', 'use only specified chars', '')
  .option('-s, --save [boolean]', 'save password to file', defSave)
  .option('-f, --file-name <filename>', 'name of password save file', defFilename)
  .parse();

// console.log(program.opts());

// Get generated password
const generatedPassword = createPassword(program.opts());

// Copy to clipboard
clipboardy.writeSync(generatedPassword);

//Output generated password
log(chalk.green('Generated Password: ') + chalk.bold(generatedPassword));
log(chalk.yellow('Password copied to clipboard'));