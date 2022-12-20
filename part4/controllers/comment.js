
const commentRouter = require('express').Router();


const Blog = require('../models/blog.js');
const Comment = require('../models/comment.js');

commentRouter.post('/:id', async (request, response) => {
	const { id } = request.decodedToken;
	const blogId = request.params.id;
	const {  comment } = request.body;

	const newComment = new Comment({
		blog: blogId,
		comment: comment,
		timestamp: new Date(),
		user: id,
	});

	const savedComment = await newComment.save();

	const blog = await Blog.findById(blogId);
	blog.comments = [...blog.comments,savedComment.id];
	await blog.save();

	response.status(201).json(savedComment);
});

module.exports = commentRouter;