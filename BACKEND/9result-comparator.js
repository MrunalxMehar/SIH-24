class ResultComparator {
    // Method to compare scan results from different antivirus engines
    compareResults(scanResults) {
      // Initialize an object to store the comparison results
      const comparisonResults = {
        agreed: [],
        disagreed: [],
        errors: []
      };
  
      // Loop through each scan result
      scanResults.forEach((result, index) => {
        // Compare the result with the previous results
        const previousResults = scanResults.slice(0, index);
        const agreed = previousResults.every((previousResult) => {
          return previousResult.isInfected === result.isInfected;
        });
  
        if (agreed) {
          comparisonResults.agreed.push(result);
        } else {
          comparisonResults.disagreed.push(result);
        }
  
        // Check for errors
        if (result.error) {
          comparisonResults.errors.push(result);
        }
      });
  
      return comparisonResults;
    }
  }
  
  module.exports = ResultComparator;

const ResultComparator = require('./9result-comparator');
const scanResults = []; // array of scan results
const comparator = new ResultComparator();
const comparisonResults = comparator.compareResults(scanResults);
console.log(comparisonResults);