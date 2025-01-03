const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');

const logServer = express();

// Set up logging
logServer.use(logger('combined'));

// Set up log file
const logFile = path.join(__dirname, 'logs', 'log.txt');
fs.mkdirSync(path.dirname(logFile), { recursive: true });

// Log requests
logServer.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url} ${req.ip} - ${new Date().toISOString()}`;
  fs.appendFileSync(logFile, logMessage + '\n');
  next();
});

// Log scan results
logServer.post('/log-scan-result', (req, res) => {
  const scanResult = req.body;
  const logMessage = `Scan result: ${scanResult.fileName} - ${scanResult.isInfected}`;
  fs.appendFileSync(logFile, logMessage + '\n');
  res.send('Log saved');
});

// Log errors
logServer.post('/log-error', (req, res) => {
  const error = req.body;
  const logMessage = `Error: ${error.message} - ${new Date().toISOString()}`;
  fs.appendFileSync(logFile, logMessage + '\n');
  res.send('Log saved');
});

logServer.listen(3000, () => {
  console.log('Log server listening on port 3000');
});