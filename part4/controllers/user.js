/* eslint-disable no-undef */
const userRouter = require('express').Router();
const User = require('../models/user');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.get('/', async (request, response) => {
	const users = await User.find().populate('blogs', {
		title: 1,
		url: 1,
		author: 1,
		likes: 1,
	});

	response.status(200).json(users);
});

userRouter.post('/register', async (request, response) => {
	const { username, password } = request.body;

	if (password.length < 3) {
		response.status(400).json({
			message:
        'User validation failed: password: Password should be at least 3 characters',
		});
		return;
	}

	const user = new User({ username, password });

	const newUser = await user.save();

	response.status(201).json(newUser);
});

userRouter.post('/login', async (request, response) => {
	const { username, password } = request.body;

	const possibleUser = await User.findOne({ username: username });

	if (!possibleUser) {
		response.status(400).json({ message: 'Invalid username and/or password' });
		return;
	}

	// const isPasswordCorrect = bcrypt.compareSync(password, possibleUser.password);
	const isPasswordCorrect = possibleUser.password === password;

	if (possibleUser && isPasswordCorrect) {
		const user = possibleUser;
		const userInfo = {
			username: user.username,
			id: user.id,
		};
		const token = jwt.sign(userInfo, process.env.SECRET_KEY, {
			expiresIn: 60 * 100,
		});

		response
			.status(200)
			.json({ username: user.username, id: user.id, token: token });

		return;
	} else {
		console.log('Passwords dont match');
	}

	response.status(400).json({ message: 'Invalid username and/or password' });
});



module.exports = userRouter;
