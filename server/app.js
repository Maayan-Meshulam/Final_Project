const express = require("express");
const app = express();
const PORT = 3131;

//נתיב שמכיל בתוכו את כל הנתיבים
const router = require("./router/router");
const connctToDB = require("./DB/DBService");

app.use(express.json())
app.use(router);

app.use((err,req, res, next)=>{
    console.log("error function");
    //ערכים ברירת מחדל - למקרה שלא נשלחו
    err.type  = err.type ?? "";
    err.status = err.status ?? "";
    err.message = err.message ?? "";
    res.send(`${err.type} ${err.message}, ${err.status}`)
});

//חיבור לשרת
app.listen(PORT, ()=>{
    console.log("server lisening to port : " + PORT);
    connctToDB();
});