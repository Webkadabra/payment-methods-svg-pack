const fs = require('fs');
const path = require('path');

const iconFolder = './src/assets'; // Path to your SVG icons folder
const readmeFilename = 'README.md'; // README file name

fs.readFile(readmeFilename, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const startMarker = '## Demo';
    const endMarker = '## 💿 Installation';

    const startIdx = data.indexOf(startMarker);
    const endIdx = data.indexOf(endMarker);

    if (startIdx === -1 || endIdx === -1) {
        console.error('Markers not found in README.md');
        return;
    }

    const startContent = data.substring(0, startIdx + startMarker.length + 1);
    const endContent = data.substring(endIdx);

    fs.readdir(iconFolder, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        const icons = files
            .filter(file => file.endsWith('.svg'))
            .map(file => {
                const name = path.basename(file, '.svg');
                const url = path.join(iconFolder, file).replaceAll('\\', '/');
                return `| ${name}   | ![${name}](${url}) | [${name}](https://github.com/webkadabra/payment-methods-svg-pack/raw/main/${url}) |`;
            })
            .join('\n');

        const updatedContent = `${startContent}\n| Type | Preview | URL |\n| ---- | ---- | ---- |\n${icons}\n\n${endContent}`;

        fs.writeFile(readmeFilename, updatedContent, 'utf8', err => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log(`File ${readmeFilename} updated successfully.`);
        });
    });
});
