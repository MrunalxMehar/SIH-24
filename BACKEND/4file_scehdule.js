const fs = require('fs');
const childProcess = require('child_process');
const cron = require('node-cron');
const ftp = require('ftp');

// Define FTP upload function
const uploadFileToFtp = (file, retries = 3) => {
  const ftpClient = new ftp();
  ftpClient.on('ready', () => {
    ftpClient.put(file, file, (err) => {
      if (err) {
        console.error(`Error uploading ${file}: ${err}`);
        if (retries > 0) {
          // Retry upload after 5 seconds
          setTimeout(() => uploadFileToFtp(file, retries - 1), 5000);
        } else {
          console.error(`Failed to upload ${file} after ${retries} retries`);
        }
      } else {
        console.log(`Uploaded ${file} successfully`);
        // Trigger AV scan after successful upload
        childProcess.exec(`av-scan-command ${file}`, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Scanned ${file}`);
          }
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
};

// Schedule FTP uploads
cron.schedule('0 2 * * *', () => {
  fs.readdir('/path/to/directory', (err, files) => {
    if (err) {
      console.error(err);
    } else {
      files.forEach((file) => {
        uploadFileToFtp(`/path/to/directory/${file}`);
      });
    }
  });
});