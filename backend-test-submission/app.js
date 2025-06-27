const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const logger = require('./middlewares/logger');
const shortUrlRoutes = require('./routes/shortUrlRoutes');
const redirectRoutes = require('./routes/redirectRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use('/api', shortUrlRoutes);
app.use('/', redirectRoutes);

module.exports = app;
