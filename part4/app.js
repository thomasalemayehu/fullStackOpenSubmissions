/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const configValues = require('./utils/config');
require('dotenv').config();
require('express-async-errors');

// DB
mongoose.connect(configValues.MONGODB_URI);

const middleware = require('./utils/middleware');
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// controllers
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');

app.use('/auth',userRouter);
app.use('/api', middleware.authenticationHandler,blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;