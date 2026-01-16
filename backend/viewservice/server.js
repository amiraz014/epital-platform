require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
const log = require('./config/logger');
const viewRoutes = require('./api/view');

app.use(cors());
app.use(express.json());
app.use('/api', viewRoutes);


app.listen(port, () => {
    log.info(`Server is running on http://localhost:${port}`);
});

module.exports = app;