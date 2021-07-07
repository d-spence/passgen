const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');

const savePassword = (password, fileName, mode='a') => {
  fs.open(path.join(__dirname, '../', fileName), mode, 666, (e, fd) => {
    fs.write(fd, password + os.EOL, null, 'utf-8', () => {
      fs.close(fd, () => {
        console.log(chalk.yellow(`Password saved to "${fileName}"`));
      });
    });
  });
}

module.exports = savePassword;