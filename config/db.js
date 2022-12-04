const dotenv = require('dotenv');
dotenv.config();
composeUri = (username, password, host, db) => {
    let userinfo = '';
    if(username || password) userinfo = `${username}:${password}@`;
    if(db) dbinfo = `/${db}`;
    return `mongodb://${userinfo}${host}${dbinfo}`
}
module.exports = {
    development: {
        uri: composeUri(process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWORD, process.env.DEV_DB_HOSTNAME, process.env.DEV_DB_NAME),
        options: {
            serverSelectionTimeoutMS: 1000
        }
    },
    test: {
        uri: composeUri(process.env.TEST_DB_USERNAME, process.env.TEST_DB_PASSWORD, process.env.TEST_DB_HOSTNAME, process.env.TEST_DB_NAME),
        options: {}
    },
    production: {
        uri: composeUri(process.env.PROD_DB_USERNAME, process.env.PROD_DB_PASSWORD, process.env.PROD_DB_HOSTNAME, process.env.PROD_DB_NAME),
        options: {}
    }
}