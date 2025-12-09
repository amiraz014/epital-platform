const express = require('express');
const app = express();
const port = 8080;
const log = require('./config/Logger');


app.use(express.json());

app.listen(port, () => {
    log.info(`Server is running on http://localhost:${port}`);
});

module.exports = app;