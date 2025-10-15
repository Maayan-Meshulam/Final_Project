const buildError = (type, message, status) => {    
    const error = new Error(`${type}: ${message}`);    
    error.status = status;

    return error;
};

module.exports = buildError;