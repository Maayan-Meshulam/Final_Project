const express = require("express");
const app = express();
const PORT = 3131;

//נתיב שמכיל בתוכו את כל הנתיבים
const router = require("./router/router");
const connctToDB = require("./DB/DBService");
const cors = require("cors");
const buildError = require("./helpers/erorrs/errorsHandeling");

app.use(express.json());

app.use(cors());

app.use(router);


app.use((err, req, res, next) => {
    console.log("error function");
    //ערכים ברירת מחדל - למקרה שלא נשלחו     ??
   res.status(err.status).send(err.message)
});

//חיבור לשרת
app.listen(PORT, () => {
    console.log("server lisening to port : " + PORT);
    connctToDB();
});