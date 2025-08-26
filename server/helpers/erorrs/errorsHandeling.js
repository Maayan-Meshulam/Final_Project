const buildError = (type, message, status) => {
    console.log("in build error");
    
    const error = new Error(`${type}: ${message}`);    
    error.status = status;

    console.log(error.status);    
    return error;
};

module.exports = buildError;