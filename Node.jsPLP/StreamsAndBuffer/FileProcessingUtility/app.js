const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const pako = require('pako');
const { constants } = require('buffer');

const inputFilePath = path.join(__dirname, 'input.txt');
const readableStream = fs.createReadStream(inputFilePath, { encoding: 'utf-8' });

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const upperCaseChunk = chunk.toString().toUpperCase();
        this.push(upperCaseChunk);
        callback();
    }
});

const gzipStream = new Transform({
    transform(chunk, encoding, callback) {
        const compressedChunk = pako.gzip(chunk.toString());
        this.push(Buffer.from(compressedChunk));
        callback();
    }
});

const outputFilePath = path.join(__dirname, 'output.txt.gz');
const writableStream = fs.createWriteStream(outputFilePath);

readableStream
    .pipe(transformStream)
    .pipe(gzipStream)
    .pipe(writableStream)
    .on('finish', () => {
        console.log('File transformation and compression complete.');
    });

writableStream.on('error', err => {
    confirm.error('An error occurred while writing the file:', err.message);
});