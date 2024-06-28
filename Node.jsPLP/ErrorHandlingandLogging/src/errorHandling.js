const { error } = require('winston');
const logger = require('./logger');

const handleError = (error, context) => {
    logger.error(`${context}: ${error.message}`);
    console.error(`${context}: ${error.message}`);
};

const wrapAsync = (fn) => {
    return function(...args) {
        return fn(...args).catch(err => handleError(err, 'Aysnc Error'))
    };
};

module.exports = { handleError, wrapAsync};