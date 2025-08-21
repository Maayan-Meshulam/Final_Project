const mongoose = require("mongoose");

const connectToLocalMongoDB = () => {
    mongoose.connect("mongodb://localhost:27017/manageSystemServer");
    console.log("connected to MongoDB");
};

module.exports = connectToLocalMongoDB;
