const nodemailer = require("nodemailer");

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
    console.log("in sending email");
    
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
        console.log(error);
    }
};

module.exports = email





