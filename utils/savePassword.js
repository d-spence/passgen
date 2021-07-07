const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');

const savePasswords = (passwords, fileName, mode='a') => {
  fs.open(path.join(__dirname, '../', fileName), mode, 666, (e, fd) => {
    passwords.forEach((password, i) => {
      fs.write(fd, password + os.EOL, null, 'utf-8', () => {
        if (i === passwords.length - 1) {
          fs.close(fd); // close when last password is written to file
          console.log(chalk.yellow(`Password(s) saved to "${fileName}"`));
        }
      });
    });
  });
}

module.exports = savePasswords;