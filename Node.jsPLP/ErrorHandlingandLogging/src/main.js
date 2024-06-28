const fs = require('fs-extra');
const path = require('path');
const pako = require('pako');
const { handleError, wrapAsync } = require('./errorHandling');
const logger = require('./logger');

const inputFilePath = path.join(__dirname, '..', 'input.txt');
const outputFilePath = path.join(__dirname, '..', 'output.txt.gz');

const processFile = async () => {
    try {
        const data = await fs.readFile(inputFilePath, 'utf-8');
        logger.info('File read successfully.');

        const upperCaseData = data.toUpperCase();
        logger.info('Data transformed successfully.');

        const compressedData = pako.gzip(upperCaseData);
        await fs.writeFile(outputFilePath, Buffer.from(compressedData));
        logger.info('File compressed and written successfully.');
    } catch (error) {
        handleError(error, 'File Processing');
    }
};

const run = wrapAsync(processFile);

run();