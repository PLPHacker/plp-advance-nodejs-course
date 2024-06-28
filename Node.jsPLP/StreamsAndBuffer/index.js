// const buf = Buffer.from('Hello from the other side', 'utf-8');
// console.log(buf.toString('utf-8'));

const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.join(__dirname, 'input.txt'), { encoding: 'utf-8'});

readableStream.on('data', chunk => {
    console.log('New chunk received');
    console.log(chunk);
});

readableStream.on('end', () => {
    console.log('No more data');
});