const recentScans = [
	{
				fileName: 'file1.txt',
				fileType: 'text/plain',
				scannedTimeAndDate: '2024-09-13 14:30:12',
				finalResult: 'Clean',
				details: {
					windowsDefender: 'Clean',
					trendMicro: 'Clean',
					eset: 'Clean'
				},
				destinationPath: 'C:/Users/TargetFolder/file1.txt'
			},
		    {
				fileName: 'document1.docx',
				fileType: 'application/msword',
				scannedTimeAndDate: '2024-09-13 14:33:09',
				finalResult: 'Malware',
				details: {
					windowsDefender: 'Clean',
					trendMicro: 'Malware',
					eset: 'Clean'
				},
				destinationPath: 'C:/Users/InfectedFolder/document1.docx'
			},
			{
				fileName: 'video1.mp4',
				fileType: 'video/mp4',
				scannedTimeAndDate: '2024-09-13 14:36:41',
				finalResult: 'Malware',
				details: {
					windowsDefender: 'Malware',
					trendMicro: 'Clean',
					eset: 'Malware'
				},
				destinationPath: 'C:/Users/InfectedFolder/video1.mp4'
			},
            {
				fileName: 'image1.jpg',
				fileType: 'image/jpeg',
				scannedTimeAndDate: '2024-09-13 14:42:49',
				finalResult: 'Clean',
				details: {
					windowsDefender: 'Clean',
					trendMicro: 'Clean',
					eset: 'Clean'
				},
				destinationPath: 'C:/Users/TargetFolder/image1.jpg'
			},
            {
            fileName: 'file2.txt',
            fileType: 'text/plain',
            scannedTimeAndDate: '2024-09-14 16:05:00',
            finalResult: 'Malware',
            details: {
                windowsDefender: 'Clean',
                trendMicro: 'Malware',
                eset: 'Clean'
            },
            destinationPath: 'C:/Users/InfectedFolder/file2.txt'
        },
            {
            fileName: 'document2.docx',
            fileType: 'application/msword',
            scannedTimeAndDate: '2024-09-14 16:10:00',
            finalResult: 'Clean',
            details: {
                windowsDefender: 'Clean',
                trendMicro: 'Clean',
                eset: 'Clean'
            },
            destinationPath: 'C:/Users/TargetFolder/document2.docx'
        },
        {
            fileName: 'video2.mp4',
            fileType: 'video/mp4',
            scannedTimeAndDate: '2024-09-14 16:15:00',
            finalResult: 'Malware',
            details: {
                windowsDefender: 'Malware',
                trendMicro: 'Clean',
                eset: 'Clean'
            },
            destinationPath: 'C:/Users/InfectedFolder/video2.mp4'
        },
        {
            fileName: 'image2.jpg',
            fileType: 'image/jpeg',
            scannedTimeAndDate: '2024-09-14 16:20:00',
            finalResult: 'Clean',
            details: {
                windowsDefender: 'Clean',
                trendMicro: 'Clean',
                eset: 'Clean'
            },
            destinationPath: 'C:/Users/TargetFolder/image2.jpg'
        },
        {
        fileName: 'file3.txt',
        fileType: 'text/plain',
        scannedTimeAndDate: '2024-09-15 12:22:00',
        finalResult: 'Clean',
        details: {
            windowsDefender: 'Clean',
            trendMicro: 'Clean',
            eset: 'Clean'
        },
        destinationPath: 'C:/Users/TargetFolder/file3.txt'
    },
        {
        fileName: 'document3.docx',
        fileType: 'application/msword',
        scannedTimeAndDate: '2024-09-15 12:24:00',
        finalResult: 'Malware',
        details: {
            windowsDefender: 'Malware',
            trendMicro: 'Malware',
            eset: 'Malware'
        },
        destinationPath: 'C:/Users/InfectedFolder/document3.docx'
    },
    {
        fileName: 'video3.mp4',
        fileType: 'video/mp4',
        scannedTimeAndDate: '2023-09-15 12:26:00',
        finalResult: 'Clean',
        details: {
            windowsDefender: 'Clean',
            trendMicro: 'Clean',
            eset: 'Clean'
        },
        destinationPath: 'C:/Users/TargetFolder/video3.mp4'
    },
    {
        fileName: 'image3.jpg',
        fileType: 'image/jpeg',
        scannedTimeAndDate: '2023-09-15 12:28:00',
        finalResult: 'Clean',
        details: {
            windowsDefender: 'Clean',
            trendMicro: 'Clean',
            eset: 'Clean'
        },
        destinationPath: 'C:/Users/TargetFolder/image3.jpg'
    },
		
    //furthur scanning files
];


const dashboard = document.querySelector('.dashboard');
const infectedFilesLink = document.querySelector('a[href="#infected-files"]');

// Initial dashboard rendering
const scansTable = document.createElement('div');
scansTable.innerHTML = `
    <h2 id="dashboard-title">Recently Scanned Files</h2>
    <table id="scans-table">
        <thead id="scans-table-header">
            <tr>
                <th>File Name</th>
                <th>File Type</th>
                <th>Scanned Time and Date</th>
                <th>Final Result</th>
                <th>More Info</th>
            </tr>
        </thead>
        <tbody id="scans-table-body">
        </tbody>
    </table>
`;
dashboard.appendChild(scansTable);

const scansTableBody = document.getElementById('scans-table-body');
recentScans.forEach((scan) => {
    const row = document.createElement('tr');
    const fileNameCell = document.createElement('td');
    const fileTypeCell = document.createElement('td');
    const scannedTimeAndDateCell = document.createElement('td');
    const finalResultCell = document.createElement('td');
    const moreInfoButtonCell = document.createElement('td');
    const moreInfoButton = document.createElement('button');

    moreInfoButton.textContent = 'More Info';
    moreInfoButton.addEventListener('click', () => {
        const detailsModal = document.createElement('div');
        detailsModal.className = 'modal';
        detailsModal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Scan Details for ${scan.fileName}</h2>
                <p>Windows Defender: ${scan.details.windowsDefender}</p>
                <p>Trend Micro: ${scan.details.trendMicro}</p>
                <p>ESET: ${scan.details.eset}</p>
                <p>Destination Path: ${scan.destinationPath}</p>
            </div>
        `;
        document.body.appendChild(detailsModal);
        const close = detailsModal.querySelector('.close');
        close.addEventListener('click', () => {
            detailsModal.remove();
        });
    });

    fileNameCell.textContent = scan.fileName;
    fileTypeCell.textContent = scan.fileType;
    scannedTimeAndDateCell.textContent = scan.scannedTimeAndDate;
    finalResultCell.textContent = scan.finalResult;
    moreInfoButtonCell.appendChild(moreInfoButton);
    row.appendChild(fileNameCell);
    row.appendChild(fileTypeCell);
    row.appendChild(scannedTimeAndDateCell);
    row.appendChild(finalResultCell);
    row.appendChild(moreInfoButtonCell);
    scansTableBody.appendChild(row);
});

// Infected files link click event
infectedFilesLink.addEventListener('click', () => {
    const scansTableBody = document.getElementById('scans-table-body');
    scansTableBody.innerHTML = '';
    recentScans.forEach((scan) => {
        if (scan.finalResult === 'Malware') {
            const row = document.createElement('tr');
            const fileNameCell = document.createElement('td');
            const fileTypeCell = document.createElement('td');
            const filePathCell = document.createElement('td');
            const scannedTimeAndDateCell = document.createElement('td');
            const windowsDefenderCell = document.createElement('td');
            const trendMicroCell = document.createElement('td');
            const esetCell = document.createElement('td');

            fileNameCell.textContent = scan.fileName;
            fileTypeCell.textContent = scan.fileType;
            filePathCell.textContent = scan.destinationPath;
            scannedTimeAndDateCell.textContent = scan.scannedTimeAndDate;
            windowsDefenderCell.textContent = scan.details.windowsDefender;
            trendMicroCell.textContent = scan.details.trendMicro;
            esetCell.textContent = scan.details.eset;

            row.appendChild(fileNameCell);
            row.appendChild(fileTypeCell);
            row.appendChild(filePathCell);
            row.appendChild(scannedTimeAndDateCell);
            row.appendChild(windowsDefenderCell);
            row.appendChild(trendMicroCell);
            row.appendChild(esetCell);
            scansTableBody.appendChild(row);
        }
    });
    const scansTableHeader = document.getElementById('scans-table-header');
    scansTableHeader.innerHTML = `
        <tr>
            <th>File Name</th>
            <th>File Type</th>
            <th>File Path</th>
            <th>Time of Scanning</th>
            <th>Windows Defender</th>
            <th>Trend Micro</th>
            <th>ESET</th>
        </tr>
    `;
    const dashboardTitle = document.getElementById('dashboard-title');
    dashboardTitle.textContent = 'All Infected Files';
});