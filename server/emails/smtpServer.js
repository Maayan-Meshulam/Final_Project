const email = require("./providers/nodemailer");

const SMTP_SERVER = process.env.SMTP_SERVER;

const sendingEmail = (emailToSend, message, title) => {
    console.log("in sending email service");
    
    if(SMTP_SERVER == "nodemailer"){
        return email(emailToSend, message, title);
    }
}

module.exports = sendingEmail