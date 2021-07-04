//mongoDB connections

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// to connect with mongoDB

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDb connected NOWW...!');
    } catch (err) {
        console.log(err.message);
        // Exit process with failure
        process.exit(1);
    }

}

module.exports = connectDB;