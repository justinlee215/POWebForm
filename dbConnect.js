const db = require('./config/keys')

const mongoose = require('mongoose')

console.log('hello world!')

const mongoDB = async () => {
    return await mongoose
    .connect(db, { useNewUrlParser: true })
    .then((data) => {
        console.log("Connected to MongoDB successfully")
    }
    )
    .catch(err => console.log("mongo connection error: ", err.message));
}


module.exports = mongoDB;