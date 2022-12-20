/* eslint-disable no-undef */
const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method);
	logger.info('Path:  ', request.path);
	logger.info('Body:  ', request.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	
	if (error.name === 'CastError') {
		return response.status(400).send({ message: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ message: error.message });
	}
	else if (error.name === 'MongoServerError') {
		return response.status(400).json({ message: error.message });
	}
	else if (
		error.name === 'NoAuthenticationToken' ||
	error.name == 'InvalidAuthenticationToken'
	) {
		return response.status(401).json({ message: error.message });
	}else if (error.name == 'JsonWebTokenError'){
		response.status(401).json({message:'Invalid/malformed authentication token'});
	}else if (error.name === 'TokenExpiredError'){
		response.status(401).json({message:'Authentication token has expired. Login again!'});
	}else{
		logger.error(error.name);
		next(error);
	}
	//
};

const authenticationHandler = (request, _ ,next)=>{

	const authorization = request.headers.authorization;
	let token = '';
		
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		token = authorization.substring(7);
		const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

		if(!decodedToken.id){
			const invalidAuthTokenError = new Error(
				'Authentication token is either expired or invalid'
			);
			invalidAuthTokenError.name = 'InvalidAuthenticationToken';
			throw invalidAuthTokenError;
		}

		request.decodedToken = decodedToken;
		next();
	}else{
		const noAuthTokenError = new Error(
			'Authentication token is not found in request header',
		);
		noAuthTokenError.name = 'NoAuthenticationToken';
		throw noAuthTokenError;
	}
	return null;
	
  
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	authenticationHandler,
	errorHandler,
};
