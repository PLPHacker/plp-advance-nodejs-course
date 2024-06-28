const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const inputFilePath = path.join(__dirname, 'output.txt.gz');
const outputFilePath = path.join(__dirname, 'decompressed_output.txt');

const gunzip = zlib.createGunzip();
const readableStream = fs.createReadStream(inputFilePath);
const writableStream = fs.createWriteStream(outputFilePath);

readableStream
    .pipe(gunzip)
    .pipe(writableStream)
    .on('finish', () => {
        console.log(`File decompression complete. Output written to ${outputFilePath}`);
    });

writableStream.on('error', err => {
    console.error('An error occurred while writing the file:', err.message);
});