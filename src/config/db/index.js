const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DB_HOST, {
            "auth": {
                "authSource": "admin"
            },
            "user": process.env.DB_USER,
            "pass": process.env.DB_PASSWORD,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }).then(res => console.log("thanhcong", res))
            .catch(handleErr => console.log(handleErr))
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
