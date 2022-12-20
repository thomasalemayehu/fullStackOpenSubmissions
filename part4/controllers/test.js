

const testRouter = require('express').Router();
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Blog = require('../models/blog');

let users = [
	{'username':'Thomas','password':'mypasswordisgood'},
	{'username':'Abel','password':'mypasswordisbad'}
];

let blogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 0,
	},
	{
		title: 'Go To Statement Considered Harm',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 0,
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 0,
	},
];


testRouter.delete('/reset',async(request,response)=>{
	await User.deleteMany({});
	await Blog.deleteMany({});

	response.status(204).end();
});

testRouter.post('/populate', async (request, response) => {
	
	await User.deleteMany({});
	// users = users.map((data) => {
	// 	console.log('password is',bcrypt.hashSync(data.password, 8));
	// 	return { ...data, password:bcrypt.hashSync(data.password, 8) };
	// });

	await User.insertMany(users);

	let user = await User.findOne({username:users[0].username});
	user = user.toJSON();

	const posterId = mongoose.mongo.ObjectId(user.id);

	blogs = blogs.map((data)=> {
		return { ...data, 'userId': posterId };
	});
    
	await Blog.deleteMany({});
	await Blog.insertMany(blogs);
	response.status(201).end();
});

module.exports = testRouter;