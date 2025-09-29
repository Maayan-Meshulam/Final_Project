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

const email = async () => {
    try {
        await transport.sendMail({
            from: "maayanmeshulam05@gmail.com",
            to: "maayanmesh@gmail.com",
            subject: "testttttttttt",
            text: "היייייייייייייייי",
        });
        console.log("email sent :)");
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = email





