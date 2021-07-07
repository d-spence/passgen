#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const log = console.log;
const {
  defLength,
  defCount,
  defFilename,
  pwSymbols,
} = require('./config/config');
const createPassword = require('./utils/createPassword');
const savePasswords = require('./utils/savePassword');

program.version('1.1.0').description('Simple password generator');

// Command options
program
  .option('-l, --length <number>', 'length of password', defLength)
  .option('-n, --no-numbers', 'exclude numbers')
  .option('-m, --no-symbols', 'exclude symbols')
  .option('-u, --use-symbols <symbols>', 'use only specified symbols', pwSymbols)
  .option('-o, --use-only <characters>', 'use only specified chars', '')
  .option('-c, --count <number>', 'number of passwords to generate', defCount)
  .option('-s, --save', 'save password to file', false)
  .option('-f, --file-name <filename>', 'name of password save file', defFilename)
  .option('-d, --debug', 'display debug info', false)
  .parse();

const { count, save, fileName, debug } = program.opts();

if (debug) {
  console.table(program.opts());
}

// Generate password(s)
let generatedPasswords = []
for (let i = 0; i < count; i++) {
  generatedPasswords.push(createPassword(program.opts()));

  //Output generated password
  log(chalk.green('Generated Password: ') + chalk.bold(generatedPasswords[i]));
}

// Save to file
if (save) {
  savePasswords(generatedPasswords, fileName);
}

// Copy to clipboard (if only 1 password)
if (count === 1) {
  clipboardy.writeSync(generatedPasswords[0]);
  log(chalk.yellow('Password copied to clipboard'));
}