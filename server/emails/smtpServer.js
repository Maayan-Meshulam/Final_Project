const email = require("./providers/nodemailer");

const SMTP_SERVER = process.env.SMTP_SERVER;

const sendingEmail = (emailToSend, message, title) => {    
    if(SMTP_SERVER == "nodemailer"){
        return email(emailToSend, message, title);
    }
}

module.exports = sendingEmail