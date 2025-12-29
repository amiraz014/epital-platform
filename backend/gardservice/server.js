require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const log = require('./config/logger');
const algoRoutes = require('./api/algo');


app.use(cors());
app.use(express.json());

app.use('/api', algoRoutes);


app.listen(port, () => {
    log.info(`Server is running on http://localhost:${port}`);
});

module.exports = app;