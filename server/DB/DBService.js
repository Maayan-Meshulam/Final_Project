const DB = "MongoDB";
const mongoose = require("mongoose");
const connectToLocalMongoDB = require('./mongoDB/connectToLocalDB');


const connctToDB = () => {
    if (DB == "MongoDB"){
        connectToLocalMongoDB();
    }
};

module.exports = connctToDB;