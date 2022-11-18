const express = require('express');
const { default: mongoose } = require('mongoose');
const { HOST, PORT, ENV } = require('./config/server');
const dbConfig = require('./config/db')[ENV];
const masterRouter = require('./routers');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(masterRouter);

mongoose.connect(dbConfig.uri, dbConfig.options).then(() => {
    process.stdout.write(`Connected to DB\n`);
    app.listen(PORT, () => {
        process.stdout.write(`Server started at ${HOST}:${PORT} (${ENV})\n`);
    });
}).catch(err => {
    process.stdout.write(`Error connecting to DB: ${err}\n`);
});

process.stdout.write(`Waiting for DB connection\n`);