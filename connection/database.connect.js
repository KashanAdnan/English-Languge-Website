const mongoose = require("mongoose");

const connectDatabase = async (url) => {
    mongoose.set("strictQuery", false)
    mongoose.connect(url ).then((res) => {
        console.log(`MongoDB Connected!`);
    }).catch((err) => {
        console.log(`MongoDB Disconnected!`);
    })
}

module.exports = connectDatabase