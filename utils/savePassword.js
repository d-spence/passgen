const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');

const savePasswords = (passwords, fileName, description) => {
  const savePath = path.join(__dirname, '../', fileName);

  fs.open(savePath, 'a', 666, (e, fd) => {
    passwords.forEach((password, i) => {
      const writeOutput = password + (description ? ` // ${description}` : '') + os.EOL;
      
      fs.write(fd, writeOutput, null, 'utf-8', () => {
        if (i === passwords.length - 1) {
          fs.close(fd); // close when last password is written to file
          console.log(chalk.yellow(`Password(s) saved to "${savePath}"`));
        }
      });
    });
  });
}

module.exports = savePasswords;