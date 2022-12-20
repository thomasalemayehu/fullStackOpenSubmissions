

const blogRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/blogs',async (request, response) => {
	const allBlogs = await Blog.find({}).populate('userId');

	if(allBlogs){
		response.status(200).json(allBlogs);
		return;
	}

	response.status(404).json({'message':'Item not found'});
	return;
});

blogRouter.get('/blog/:id', async (request, response) => {
	const id = request.params.id;
	const blog = await Blog.find({ _id: id }).populate({
		path: 'comments',
		populate: {
			path: 'user',
		},
	});

	if (blog) {
		response.status(200).json(blog[0]);
		return;
	}

	response.status(404).json({ message: 'Item not found' });
	return;
});

blogRouter.post('/blog', async(request, response) => {
	const {id} = request.decodedToken;
	const {title,author,url} = request.body;

	const newBlog = { title, author, url, userId: id };
	const user = await User.findById(id);

	const blog = new Blog(newBlog);

	const result = await blog.save();

	user.blogs = [...user.blogs,result._id];
	await user.save();

	response.status(201).json(result);
});

blogRouter.delete('/blog/:id', async (request, response) => {

	
	const {id} = request.decodedToken; 
	const blogId = request.params.id;
	
	const blogToBeDeleted = await Blog.findById(blogId);
	const user = await User.findById(id).populate('comment');
	console.log(request.decodedToken);
	
	if(blogToBeDeleted?.userId.toString() === id){
		
		// Delete blog from user
		const clearedBlogs = user.blogs.filter(
			(currentBlogId) => {
				console.log(currentBlogId);
				currentBlogId.toString() !== blogId;
			}
		);
		user.blogs = clearedBlogs;
		await user.save();

		// delete blog
		await Blog.deleteOne({_id:blogId});
		const info = await Blog.find({});

		

		response.status(204).json(info);
	}
	
	else{
		response.status(403).json({message:'Delete not allowed'});
	}
});


blogRouter.get('/blog/like/:id',async(request,response)=>{
	// console.log
	const id = request.params.id;
	const blog = await Blog.findById(id);

	if(blog){
		blog.likes = blog.likes + 1;
	}

	await blog.save();

	response.status(204).json(blog);
});


module.exports = blogRouter;