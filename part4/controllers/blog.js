

const blogRouter = require('express').Router();

const Blog = require('../models/blog');

blogRouter.get('/blogs',async (request, response) => {
	const allBlogs = await Blog.find({});

	if(allBlogs){
		response.status(200).json(allBlogs);
		return;
	}

	response.status(404).json({'message':'Item not found'});
	return;
});

blogRouter.get('/blog/:id', async (request, response) => {
	const id = request.params.id;
	const blog = await Blog.find({_id:id});

	if (blog) {
		response.status(200).json(blog[0]);
		return;
	}

	response.status(404).json({ message: 'Item not found' });
	return;
});

blogRouter.post('/blog', async(request, response) => {
	const blog = new Blog(request.body);

	const result = await blog.save();

	response.status(201).json(result);
});

blogRouter.delete('/blog/:id', async (request, response) => {
	const id = request.params.id;
	
	await Blog.deleteOne({_id:id});
	response.status(204).end();
});

module.exports = blogRouter;