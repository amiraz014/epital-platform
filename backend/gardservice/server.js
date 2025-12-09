require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const log = require('./config/logger');
const algoRoutes = require('./api/algo');


app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the API server!');
});
app.use('/api', algoRoutes);


app.listen(port, () => {
    log.info(`Server is running on http://localhost:${port}`);
});

module.exports = app;