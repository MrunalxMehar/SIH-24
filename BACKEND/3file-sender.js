const ftp = require('ftp');
const fs = require('fs');
const filePicker = require('./2file-picker');
const http = require('http');

// Define the file sender interface
const fileSender = {
  // Method to send files
  sendFiles: () => {
    // Connect to FTP server
    const ftpClient = new ftp();
    ftpClient.on('ready', () => {
      // Get list of files from FTP server
      ftpClient.list((err, files) => {
        if (err) {
          console.error(`Error listing files: ${err}`);
        } else {
          // Download files from FTP server
          files.forEach((file) => {
            ftpClient.get(file.name, (err, stream) => {
              if (err) {
                console.error(`Error downloading file: ${err}`);
              } else {
                // Save file to local directory
                stream.pipe(fs.createWriteStream(file.name));
                // Send file to Load Distributor
                const options = {
                  hostname: 'load-distributor',
                  port: 8080,
                  path: '/scan',
                  method: 'POST'
                };
                const req = http.request(options, (res) => {
                  console.log(`File sent: ${file.name}`);
                });
                req.on('error', (e) => {
                  console.error(`Error sending file: ${e}`);
                });
                fs.readFileSync(file.name).forEach((chunk) => {
                  req.write(chunk);
                });
                req.end();
              }
            });
          });
        }
      });
    });

    ftpClient.on('error', (err) => {
      console.error(`Error connecting to FTP server: ${err}`);
    });

    ftpClient.connect({
      host: 'ftp-server-hostname',
      user: 'ftp-username',
      password: 'ftp-password'
    });
  }
};

// Send files to load distributor
fileSender.sendFiles();