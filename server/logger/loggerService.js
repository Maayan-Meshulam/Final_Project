const morganLogger = require("./morgan/morganLogger");

const LOGGER = "morgan";

const loggerMiddleWare = () => {
    if (LOGGER == "morgan")
        return morganLogger;
    else
        return (req, res, next)=>{}
}

module.exports = loggerMiddleWare