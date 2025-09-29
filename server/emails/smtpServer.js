const email = require("./providers/nodemailer");

const SMTP_SERVER = "nodemailer";

const sendingEmail = () => {
    if(SMTP_SERVER == "nodemailer"){
        email();
    }
}

module.exports = sendingEmail