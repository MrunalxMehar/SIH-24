const fs = require('fs');
const path = require('path');
const { Client } = require('ssh2');

class FilePicker {
  constructor(options = {}) {
    this.supportedExtensions = options.extensions || ['.txt', '.docx', '.pdf'];
    this.remoteServers = options.remoteServers || [
      {
        host: 'vm1_ip_address',
        username: 'username',
        password: 'password',
        destination: '/path/to/destination/folder',
      },
      {
        host: 'vm2_ip_address',
        username: 'username',
        password: 'password',
        destination: '/path/to/destination/folder',
      },
      {
        host: 'vm3_ip_address',
        username: 'username',
        password: 'password',
        destination: '/path/to/destination/folder',
      },
    ];
  }

  pickFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
      }

      const fileExtension = path.extname(filePath);
      if (this.supportedExtensions.includes(fileExtension)) {
        console.log(`File picked: ${filePath}`);

        // Copy file to remote servers
        this.remoteServers.forEach((server) => {
          const conn = new Client();
          conn.on('ready', () => {
            conn.scp({
              source: filePath,
              destination: `${server.destination}/${path.basename(filePath)}`,
            }, (err) => {
              if (err) {
                console.error(`Error copying file to ${server.host}: ${err.message}`);
              } else {
                console.log(`File copied to ${server.host}`);
                // Call Multi-AV Scanner component here
              }
            });
          }).connect({
            host: server.host,
            username: server.username,
            password: server.password,
          });
        });
      } else {
        console.log(`File skipped: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error picking file: ${error.message}`);
    }
  }
}

module.exports = FilePicker;