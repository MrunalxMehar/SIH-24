class ScanResult {
    constructor(scanResult) {
      this.engineName = scanResult.engineName;
      this.fileName = scanResult.fileName;
      this.isInfected = scanResult.isInfected;
    }
  }
  
  module.exports = ScanResult;