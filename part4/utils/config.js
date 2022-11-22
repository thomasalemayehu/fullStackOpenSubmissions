/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */

require('dotenv').config();

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
  	? process.env.TEST_MONGO_DB_URL
  	: process.env.NODE_ENV == 'development'
  		? process.env.DEV_MONGO_DB_URL
  		: process.env.MONGO_DB_URL;

module.exports = {
	MONGODB_URI,
	PORT,
	ENV
};
