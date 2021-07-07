#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const log = console.log;
const {
  defLength,
  defFilename,
  pwSymbols,
} = require('./config/config');
const createPassword = require('./utils/createPassword');

program.version('1.0.1').description('Simple password generator');

// Command options
program
  .option('-l, --length <number>', 'length of password', defLength)
  .option('-n, --no-numbers', 'exclude numbers')
  .option('-m, --no-symbols', 'exclude symbols')
  .option('-u, --use-symbols <symbols>', 'use only specified symbols', pwSymbols)
  .option('-o, --use-only <characters>', 'use only specified chars', '')
  .option('-s, --save', 'save password to file', false)
  .option('-f, --file-name <filename>', 'name of password save file', defFilename)
  .option('-d, --debug', 'display debug info', false)
  .parse();

const { debug } = program.opts();
if (debug) {
  console.table(program.opts());
}

// Get generated password
const generatedPassword = createPassword(program.opts());

// Copy to clipboard
clipboardy.writeSync(generatedPassword);

//Output generated password
log(chalk.green('Generated Password: ') + chalk.bold(generatedPassword));
log(chalk.yellow('Password copied to clipboard'));