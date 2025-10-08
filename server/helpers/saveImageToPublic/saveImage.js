const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const buildError = require("../../helpers/erorrs/errorsHandeling");

const directoryPath = path.join(__dirname, "../public"); // יצירת נתיב  

//אם הנתיב לא קיים ניצור אותו
if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
}

const morganLogger = morgan((tokens, req, res) => {
    try {
        const date = new Date();
        const dateForFile = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`

        const message = [
            `[${dateForFile}]`,
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms'
        ].join(' ') + '\n'

        const logFilePath = path.join(directoryPath, dateForFile);

        fs.appendFileSync(logFilePath, message);
        return message;

    } catch (error) {
        throw (buildError("Morgan Error", error.message, 400));
    }
})

module.exports = morganLogger

