const childProcess = require('child_process');
const vm1 = 'vm1_ip_address';
const vm2 = 'vm2_ip_address';
const vm3 = 'vm3_ip_address';

// Define scanning commands
const scanningCommands = {
  windowsDefender: (file) => `MpCmdRun.exe -Scan -ScanType 3 -File "${file}"`,
  trendMicro: (file) => `TmCmd.exe -scan -file "${file}"`,
  eset: (file) => `ecls.exe -scan -file "${file}"`
};

// Define VMs and their corresponding scanning commands
const vms = [
  { ip: vm1, command: scanningCommands.windowsDefender },
  { ip: vm2, command: scanningCommands.trendMicro },
  { ip: vm3, command: scanningCommands.eset }
];

// Files to scan
const filesToScan = ['C:\\Path\\To\\File1', 'C:\\Path\\To\\File2'];

// Scan files concurrently across VMs
const scanFiles = async () => {
  const scanPromises = filesToScan.map((file) => {
    return Promise.all(vms.map((vm) => {
      const cmd = vm.command(file);
      return new Promise((resolve, reject) => {
        childProcess.exec(`ssh ${vm.ip} ${cmd}`, (error, stdout, stderr) => {
          if (error) {
            reject(`Error scanning file with ${vm.ip}: ${error}`);
          } else {
            resolve(`Scanned file with ${vm.ip}: ${stdout}`);
          }
        });
      });
    }));
  });

  try {
    const scanResults = await Promise.all(scanPromises);
    scanResults.forEach((results, index) => {
      console.log(`File ${filesToScan[index]} scan results:`);
      results.forEach((result) => console.log(result));
    });
  } catch (error) {
    console.error(error);
  }
};

scanFiles();