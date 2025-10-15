const nodemailer = require("nodemailer");
const buildError = require("../../helpers/erorrs/errorsHandeling");

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "maayanmeshulam05@gmail.com",
        pass: "grev ggkn gcjz ysai"
    }
});

const email = async (email, messageHtml, title) => {
    
    try {
        const message = {
            from: "maayanmeshulam05@gmail.com",
            to: email,
            subject: title,
            html: messageHtml
        }
        await transport.sendMail(message);
        return message

    } catch (error) {
        return buildError('Email Error:', error.message, 500)
    }
};

module.exports = email





