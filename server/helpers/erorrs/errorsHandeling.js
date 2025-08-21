const buildError = (type, message, status) => {
    console.log("in build error");
    
    const err = new Error();    

    err.type = type;
    err.status = status;
    err.message = message;
    
    return err;
};

module.exports = buildError;