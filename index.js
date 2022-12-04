const express = require('express');
const { default: mongoose } = require('mongoose');
const { HOST, PORT, ENV } = require('./config/server');
const dbConfig = require('./config/db')[ENV];
const masterRouter = require('./routers');
const crons = require('./crons');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(masterRouter);

mongoose.connect(dbConfig.uri, dbConfig.options).catch(err => {
    process.stdout.write(`Error connecting to DB at ${dbConfig.uri}: ${err}\n`);
});

mongoose.connection.on('connected', () => {
    process.stdout.write(`Connected to DB ${dbConfig.uri}\n`);
});

app.listen(PORT, () => {
    process.stdout.write(`Server started at ${HOST}:${PORT} (${ENV})\n`);
    // crons.start();
});

module.exports = {
    app
};