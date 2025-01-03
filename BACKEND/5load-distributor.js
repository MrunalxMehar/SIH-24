const http = require('http');
const url = require('url');

// Define the virtual machines (VMs) and their URLs
const vms = [
  { id: 1, url: 'http://vm1:8080', capacity: 100, currentLoad: 0 },
  { id: 2, url: 'http://vm2:8080', capacity: 150, currentLoad: 0 },
  { id: 3, url: 'http://vm3:8080', capacity: 200, currentLoad: 0 }
];

// Define the load distribution algorithm (e.g., least-connection)
const algorithm = 'least-connection';

// Function to update VM load after FTP upload
function updateVmLoad(vm, uploadTime) {
  // Calculate load based on upload time (e.g., 1 MB/s)
  const load = uploadTime / 1000; // Convert seconds to milliseconds
  vm.currentLoad += load;
  if (vm.currentLoad > vm.capacity) {
    vm.currentLoad = vm.capacity;
  }
}

// Function to get the least loaded VM
function getVm() {
  if (algorithm === 'least-connection') {
    return vms.reduce((minVm, currentVm) => {
      return currentVm.currentLoad < minVm.currentLoad ? currentVm : minVm;
    }, vms[0]);
  }
  // Add other load distribution algorithms as needed
}

http.createServer((req, res) => {
  const file = url.parse(req.url).pathname;
  const vm = getVm();
  const fileSize = req.headers['content-length'];

  // Simulate FTP upload time (replace with actual upload time)
  const uploadTime = fileSize / 1000000; // Convert bytes to seconds

  // Update VM load after FTP upload
  updateVmLoad(vm, uploadTime);

  // Forward the request to the selected VM
  const proxyReq = http.request({
    method: req.method,
    hostname: vm.url,
    path: file,
    headers: req.headers
  }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });
  req.pipe(proxyReq);
}).listen(8080, () => {
  console.log('Load distributor listening on port 8080');
});