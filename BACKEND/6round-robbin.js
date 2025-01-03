// Round-Robin algorithm

// List of virtual machines
const vms = ["VM1 (Windows Defender)", "VM2 (Trend Micro)", "VM3 (ESET Internet Security)"];

// Function to distribute files for scanning by all VMs using round-robin
function roundRobinScans(files, vms) {
    const vmScanOrders = {};
    const vmCount = vms.length;

    // Initialize each VM's scan order as an empty array
    vms.forEach(vm => {
        vmScanOrders[vm] = [];
    });

    // Distribute each file to all VMs in a round-robin order
    files.forEach((file, fileIndex) => {
        const startVmIndex = fileIndex % vmCount;

        // Assign the file to each VM in round-robin order
        for (let i = 0; i < vmCount; i++) {
            const vm = vms[(startVmIndex + i) % vmCount];
            vmScanOrders[vm].push(file);
        }
    });

    return vmScanOrders;
}

// Example file list with priorities
const files = [
    { name: "file1.txt", priority: 1 },
    { name: "file2.txt", priority: 2 },
    { name: "file3.txt", priority: 1 },
    { name: "file4.txt", priority: 3 },
    { name: "file5.txt", priority: 2 },
    { name: "file6.txt", priority: 1 }
];

// Sort files by priority
files.sort((a, b) => a.priority - b.priority);

// Get the scan order for each VM
const scanOrders = roundRobinScans(files.map(file => file.name), vms);

// Output the scanning order for each VM
for (const [vm, scanOrder] of Object.entries(scanOrders)) {
    console.log(`${vm} will scan: ${scanOrder}`);
}