const mongoose = require('mongoose');
const { database, databaseToSession } = require('../db/database')
require('dotenv').config();
async function connect() {
    try {
        await mongoose.connect(database(), {
            "auth": {
                "authSource": "admin"
            },
            "user": process.env.DB_USER,
            "pass": process.env.DB_PASSWORD,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }).then((res) => res)
            .catch(handleErr => console.log(handleErr))
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
