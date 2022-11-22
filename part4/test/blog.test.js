const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const Blogs = require('../models/blog');
const blogHelper = require('./blog_helpers');
const { default: mongoose } = require('mongoose');
const timeout = 1000000;
beforeEach(async () => {
	await Blogs.deleteMany({});
	await Blogs.insertMany(blogHelper.allBlogs);
}, timeout);

describe('api routes tests', () => {
	// fetching
	describe('fetching blogs', () => {
		test(
			'all blogs are fetched',
			async () => {
				await api
					.get('/api/blogs')
					.expect(200)
					.expect('Content-Type', /application\/json/);
			},
			timeout
		);

		test('identifier should be defined as id', async () => {
			const allBlogs = await (
				await api
					.get('/api/blogs')
					.expect(200)
					.expect('Content-Type', /application\/json/)
			).body;
			console.log(allBlogs);

			expect(allBlogs[0].id).toBeDefined();
		});

		test('get by unique id', async () => {
			const blog = blogHelper.allBlogs[0];
			const fetchedBlog = await api
				.get(`/api/blog/${blog._id}`)
				.expect(200)
				.expect('Content-Type', /application\/json/);

			expect(fetchedBlog.body.title).toBeDefined();
		});

		test('get by malformed id', async () => {
			const blog = blogHelper.allBlogs[0];
			const fetchedBlog = await api.get(`/api/blog/${blog.id}`).expect(400);

			expect(fetchedBlog.body.message).toContain('malformatted id');
		});
	});

	// posting
	describe('posting new blogs', () => {
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
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const response = await api
				.get('/api/blogs')
				.expect(200)
				.expect('Content-Type', /application\/json/);
			const contents = response.body.map((blog) => blog.title);

			expect(response.body).toHaveLength(blogHelper.allBlogs.length + 1);
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
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const response = await api
				.get('/api/blogs')
				.expect(200)
				.expect('Content-Type', /application\/json/);
			const postedBlog = response.body.filter(
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
				.send(blogMissingTitle)
				.expect(400);

			expect(response.body.message).toBeDefined();
			expect(response.body.message).toContain('Title is required for blog');
		});
	});

	describe('deleting resources', () => {
		test('delete blog with malformed id', async () => {
			const blogToDelete = blogHelper.allBlogs[0];
			const deleteResponse = await api
				.delete(`/api/blog/${blogToDelete.id}`)
				.expect(400);

			expect(deleteResponse.body.message).toContain('malformatted id');
		});

		test('delete blog by id', async () => {
			const blogToDelete = blogHelper.allBlogs[0];
			await api.delete(`/api/blog/${blogToDelete._id}`).expect(204);

			const allBlogs = await api.get('/api/blogs').expect(200);

			const filteredBlogs = allBlogs.body.filter(
				(blog) =>
					blog.title == blogToDelete.title && blog.id == blogToDelete._id
			);

			expect(filteredBlogs).toHaveLength(0);
		});
	});
});

afterAll(async () => {
	mongoose.connection.close();
});
