const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const Blogs = require('../models/blog');
const User = require('../models/user');


const blogHelper = require('./blog_helpers');
const userHelper = require('./user_helpers');

const { mongoose } = require('mongoose');
const timeout = 1000000;

let userOneToken = '';
let userTwoToken = '';
let incorrectUserToken ='thisisawrongtoken';

beforeEach(async () => {

	// Clear DB
	await User.deleteMany({});
	await Blogs.deleteMany({});


	// register users
	const userObjects = userHelper.allUsers.map((user) => new User(user));
	const userPromiseArray = userObjects.map((user) => user.save());
	await Promise.all(userPromiseArray);


	// login users
	const loginOneResponse = await api
		.post('/auth/login')
		.send(userHelper.allUsers[0]);
	userOneToken = loginOneResponse.body.token;

	const loginTwoResponse = await api
		.post('/auth/login')
		.send(userHelper.allUsers[1]);
	userTwoToken = loginTwoResponse.body.token;


	// add blogs
	const blogPromiseArray = blogHelper.allBlogs.map((blog) =>
		api
			.post('/api/blog')
			.send(blog)
			.set({
				Authorization: `bearer ${userOneToken}`,
				'Content-Type': 'application/json',
			}),
	);
	await Promise.all(blogPromiseArray);
}, timeout);

describe('api routes tests', () => {
	// fetching
	describe('fetching blogs', () => {
		test(
			'no blog should be fetched without Authentication Token',
			async () => {
				await api
					.get('/api/blogs')
					.expect(401);
			},
			timeout
		);


		test('blogs should appear if correct token is provided',async()=>{
			const allBlogs = await api
				.get('/api/blogs')
				.set({ Authorization: `bearer ${userOneToken}` });

			expect(allBlogs.body).toHaveLength(blogHelper.allBlogs.length);
		});

		test('blogs should not appear if incorrect token is provided', async () => {
			await api
				.get('/api/blogs')
				.set({ Authorization: `bearer ${incorrectUserToken}` }).expect(401);
		});

		test('identifier should be defined as id', async () => {
			const allBlogs = await api.get('/api/blogs')
				.set({'Authorization':`bearer ${userOneToken}`})
				.expect(200)
				.expect('Content-Type', /application\/json/);
		
			expect(allBlogs.body[0].id).toBeDefined();
		});

		test('get by unique id', async () => {
			
			const allBlogs = await api.get('/api/blogs')
				.set({ Authorization: `bearer ${userOneToken}`});
			const blog =allBlogs.body[0];
	
			const fetchedBlog = await api
				.get(`/api/blog/${blog.id}`)
				.set({ Authorization: `bearer ${userOneToken}`})
				.expect(200)
				.expect('Content-Type', /application\/json/);
				
			expect(fetchedBlog.body.title).toBeDefined();
		});

		test('get by malformed id', async () => {
			const allBlogs = await api
				.get('/api/blogs')
				.set({ Authorization: `bearer ${userOneToken}` });
			const blog = allBlogs.body[0];

			
			const fetchedBlog = await api
				.get(`/api/blog/${blog._id}`)
				.set({ Authorization: `bearer ${userOneToken}` })
				.expect(400);

			expect(fetchedBlog.body.message).toContain('malformatted id');
		});
	});

	// posting
	describe('posting new blogs', () => {

		test('adding new blog without token should not work', async () => {
			const newBlog = {
				title: 'Test Blog',
				author: 'Test Blog"s author',
				url: 'test.com',
				likes: 0,
			};

			await api
				.post('/api/blog')
				.send(newBlog)
				.expect(401);
          
			const response = await blogHelper.getBlogsInDB();
			expect(response).toHaveLength(blogHelper.allBlogs.length);
      
		});

		test('adding new blog should increase blog count and save new blog', async () => {
			const newBlog = {
				title: 'Test Blog',
				author: 'Test Blog"s author',
				url: 'test.com',
				likes: 0,
			};

			await api
				.post('/api/blog')
				.send(newBlog)
				.set({'Authorization':`bearer ${userOneToken}`})
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const response = await blogHelper.getBlogsInDB();
			const contents = response.map((blog) => blog.title);
			expect(response).toHaveLength(blogHelper.allBlogs.length + 1);
			expect(contents).toContain('Test Blog');
		});

		test('zero should be default likes value', async () => {
			const newBlog = {
				title: 'Test Blog',
				author: 'Test Blog"s author',
				url: 'test.com',
			};

			await api
				.post('/api/blog')
				.send(newBlog)
				.set({'Authorization':`bearer ${userOneToken}`})
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const response = await blogHelper.getBlogsInDB();
			const postedBlog = response.filter(
				(blog) =>
					blog.title == newBlog.title &&
					blog.author == newBlog.author &&
					blog.url == newBlog.url
			);
			expect(postedBlog[0].likes).toBe(0);
		});

		test('url must be required', async () => {
			const blogMissingUrl = {
				title: 'Test Blog',
				author: 'Test Blog"s author',
			};

			const response = await api
				.post('/api/blog')
				.set({ 'Authorization': `bearer ${userOneToken}` })
				.send(blogMissingUrl)
				.expect(400);

			expect(response.body.message).toBeDefined();
			expect(response.body.message).toContain('URL is required for blog');
		});

		test('title must be required', async () => {
			const blogMissingTitle = {
				url: 'Test Blog',
				author: 'Test Blog"s author',
			};

			const response = await api
				.post('/api/blog')
				.set({ 'Authorization': `bearer ${userOneToken}` })
				.send(blogMissingTitle)
				.expect(400);

			expect(response.body.message).toBeDefined();
			expect(response.body.message).toContain('Title is required for blog');
		});
	});

	describe('deleting resources', () => {

		test('delete blog without token should not work', async () => {
			const blogToDelete = blogHelper.allBlogs[0];
			const deleteResponse = await api
				.delete(`/api/blog/${blogToDelete.id}`)
				.expect(401);

			expect(deleteResponse.body.message).toContain('token');
		});

		test('delete blog with malformed id', async () => {
			const blogToDelete = blogHelper.allBlogs[0];
			const deleteResponse = await api
				.delete(`/api/blog/${blogToDelete.id}`)
				.set({'Authorization':`bearer ${userOneToken}`})
				.expect(400);

			expect(deleteResponse.body.message).toContain('malformatted id');
		});

		test('delete blog by id', async () => {
			let allBlogs = await blogHelper.getBlogsInDB();
			const blogToDelete = allBlogs[0];
			await api
				.delete(`/api/blog/${blogToDelete.id}`)
				.set({ Authorization: `bearer ${userOneToken}` })
				.expect(204);
			
			allBlogs = await blogHelper.getBlogsInDB();

			const filteredBlogs = allBlogs.filter(
				(blog) =>
					blog.title == blogToDelete.title && blog.id == blogToDelete.id
			);

			expect(filteredBlogs).toHaveLength(0);
		});

		test('delete blog by id with unauthorized token', async () => {
			let allBlogs = await blogHelper.getBlogsInDB();
			const blogToDelete = allBlogs[0];
			const deleteResponse = await api
				.delete(`/api/blog/${blogToDelete.id}`)
				.set({ Authorization: `bearer ${userTwoToken}` })
				.expect(403);

			expect(deleteResponse.body.message).toContain('not allowed');

			allBlogs = await blogHelper.getBlogsInDB();
			const filteredBlogs = allBlogs.filter(
				(blog) =>
					blog.title == blogToDelete.title && blog.id == blogToDelete.id
			);

			expect(filteredBlogs).toHaveLength(1);
		});
	});
});

afterAll(async () => {
	mongoose.connection.close();
});
