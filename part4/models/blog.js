const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required for blog.'],
	},
	author: String,
	url: {
		type: String,
		required: [true, 'URL is required for blog.'],
	},
	likes: {
		type: Number,
		default: 0,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	}],
});

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
