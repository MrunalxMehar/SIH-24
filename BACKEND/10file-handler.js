const fs = require('fs');
const path = require('path');

class FileHandler {
  // Method to handle files based on scan results
  handleFile(fileName, scanResult) {
    if (scanResult.isInfected) {
      // Move file to quarantine directory
      const quarantineDir = path.join(__dirname, 'quarantine');
      fs.mkdirSync(quarantineDir, { recursive: true });
      fs.renameSync(fileName, path.join(quarantineDir, path.basename(fileName)));
      console.log(`Moved infected file to quarantine: ${fileName}`);
    } else {
      // Move file to clean directory
      const cleanDir = path.join(__dirname, 'clean');
      fs.mkdirSync(cleanDir, { recursive: true });
      fs.renameSync(fileName, path.join(cleanDir, path.basename(fileName)));
      console.log(`Moved clean file: ${fileName}`);
    }
  }
}

module.exports = FileHandler;

const FileHandler = require('./10file-handler');
const fileHandler = new FileHandler();
const fileName = 'example.txt';
const scanResult = { isInfected: true }; // or false
fileHandler.handleFile(fileName, scanResult);