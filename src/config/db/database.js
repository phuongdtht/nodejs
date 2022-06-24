require('dotenv').config();
module.exports = {
    database: function () {
        url = "mongodb://" +
            process.env.DB_HOST +
            ":" +
            process.env.DB_PORT +
            "/" +
            process.env.DB_NAME
        return url;
    },
    databaseToSession: function () {
        url = "mongodb://" +
            process.env.DB_USER +
            ":" +
            process.env.DB_PASSWORD +
            "@" +
            process.env.DB_HOST +
            ":" +
            process.env.DB_PORT
        return url;
    },
};
