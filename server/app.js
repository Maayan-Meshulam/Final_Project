const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;


//נתיב שמכיל בתוכו את כל הנתיבים
const router = require("./router/router");
const connctToDB = require("./DB/DBService");
const cors = require("cors");
const buildError = require("./helpers/erorrs/errorsHandeling");
const loggerMiddleWare = require("./logger/loggerService");
const Server = require('socket.io');


app.use(express.json());

app.use(cors());
app.use(loggerMiddleWare());

app.use(express.static("./public"));

app.use(router);





app.use((err, req, res, next) => {
    const status = err.status ?? 500
    res.status(status).send(err.message)
});

//חיבור לשרת
app.listen(PORT, () => {
    console.log("server lisening to port : " + PORT);
    connctToDB();
});
