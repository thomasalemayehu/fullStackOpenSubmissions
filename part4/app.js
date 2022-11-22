/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const configValues = require('./utils/config');
require('dotenv').config();
require('express-async-errors');

// controllers
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');
console.log(configValues.MONGODB_URI);
mongoose.connect(configValues.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;