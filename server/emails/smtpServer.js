const email = require("./providers/nodemailer");

const SMTP_SERVER = "nodemailer";

const sendingEmail = (emailToSend, message) => {
    console.log("in sending email service");
    
    if(SMTP_SERVER == "nodemailer"){
        return email(emailToSend, message);
    }
}

module.exports = sendingEmail