//npm install chokidar

const chokidar = require('chokidar');

// Set up folder watcher
const watcher = chokidar.watch('C://TargetFolder', {
  persistent: true,
  ignoreInitial: false,
  followSymlinks: false,
  cwd: '.',
  disableGlobbing: false,
  usePolling: false,
  interval: 100,
  binaryInterval: 300,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },
  ignorePermissionErrors: false,
  atomic: false
});

// Handle new files
watcher.on('add', (path, stats) => {
  console.log(`File added: ${path}`);
  // Call File Picker component here
});

// Handle modified files
watcher.on('change', (path, stats) => {
  console.log(`File modified: ${path}`);
  // Call File Picker component here
});

// Handle deleted files
watcher.on('unlink', (path) => {
  console.log(`File deleted: ${path}`);
});

// Handle errors
watcher.on('error', (error) => {
  console.error(`Error: ${error}`);
});


//require the FilePicker component
const FilePicker = require('./2file-picker');

//event handler
watcher.on('add', (path, stats) => {
    console.log(`File added: ${path}`);
    const filePicker = new FilePicker();
    filePicker.pickFile(path);
  });