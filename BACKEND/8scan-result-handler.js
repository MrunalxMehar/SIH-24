const { ScanResult } = require('./6scan-result');

class ScanResultHandler {
  constructor() {
    this.scanResults = [];
  }

  // Method to handle scan results from antivirus engines
  handleScanResult(scanResult) {
    // Create a new ScanResult object
    const result = new ScanResult(scanResult);
    // Add the result to the array of scan results
    this.scanResults.push(result);
  }

  // Method to get the final scan result
  getFinalScanResult() {
    // Determine the final scan result based on the results from all antivirus engines
    const finalResult = this.scanResults.reduce((acc, current) => {
      if (current.isInfected) {
        acc.isInfected = true;
      }
      return acc;
    }, { isInfected: false });
    return finalResult;
  }
}

module.exports = ScanResultHandler;