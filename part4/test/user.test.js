const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);
const User = require('../models/user');
const userHelper = require('./user_helpers');
const { default: mongoose } = require('mongoose');
const timeout = 1000000;

beforeEach(async () => {
	await User.deleteMany({});

	// register users
	const userObjects = userHelper.allUsers.map((user) => new User(user));
	const userPromiseArray = userObjects.map((user) => user.save());
	await Promise.all(userPromiseArray);
}, timeout);

describe('user tests', () => {
	describe('creating new user', () => {

		test(
			'create user with valid username and password',
			async () => {
				const newUser = {
					username: 'Test Man',
					password: 'eberyestrongpassword',
				};
				await api.post('/auth/register').send(newUser).expect(201);
				const allUsers = await userHelper.getUsersInDB();
				expect(allUsers).toHaveLength(userHelper.allUsers.length + 1);
			},
			timeout
		);

		test(
			'password should not show',
			async () => {
				const newUser = {
					username: 'Test Man',
					password: 'eberyestrongpassword',
				};
				await api.post('/auth/register').send(newUser).expect(201);
				const users = await (await api.get('/auth')).body;
				expect(users).toHaveLength(userHelper.allUsers.length + 1);
				expect(users[0].password).toBe(undefined);
			},
			timeout
		);

		test(
			'username should be unique',
			async () => {
				const newUser = {
					username: 'Test Man',
					password: 'eberyestrongpassword',
				};
				await api.post('/auth/register').send(newUser).expect(201);
				const users = await userHelper.getUsersInDB();
				expect(users).toHaveLength(userHelper.allUsers.length + 1);
				const response = await api.post('/auth/register').send(newUser).expect(400);
				expect(response.body.message).toContain('duplicate key');
			},
			timeout
		);

		test(
			'username should be at least 3 characters long',
			async () => {
				const newUser = {
					username: 'Te',
					password: 'eberyestrongpassword',
				};
				const response = await api.post('/auth/register').send(newUser).expect(400);
				expect(response.body.message).toContain(
					'Username should be at least 3 characters'
				);
				const users = await userHelper.getUsersInDB();
				expect(users).toHaveLength(userHelper.allUsers.length);
			},
			timeout
		);

		test(
			'password should be at least 3 characters long',
			async () => {
				const newUser = {
					username: 'Test Man',
					password: 'eb',
				};
				const response = await api.post('/auth/register').send(newUser).expect(400);
				expect(response.body.message).toContain(
					'Password should be at least 3 characters'
				);
				const users = await userHelper.getUsersInDB();
				expect(users).toHaveLength(userHelper.allUsers.length);
			},
			timeout
		);
	});

	describe('logging in a user', () => {

		test('logging in with invalid username', async () => {
			const response = await api
				.post('/auth/login')
				.send({ username: 'Amare', password: 'estrongpassword' })
				.expect(400);

			expect(response.body.message).toBe('Invalid username and/or password');
			expect(response.body.token).toBe(undefined);
		});

		test('logging in with invalid password', async () => {
			const response = await api
				.post('/auth/login')
				.send({ username: 'Abebe', password: 'esstrongpassword' })
				.expect(400);

			expect(response.body.message).toBe('Invalid username and/or password');
			expect(response.body.token).toBe(undefined);
		});

		test('logging in with invalid username and  password', async () => {
			const response = await api
				.post('/auth/login')
				.send({ username: 'Amare', password: 'esstrongpassword' })
				.expect(400);

			expect(response.body.message).toBe('Invalid username and/or password');
			expect(response.body.token).toBe(undefined);
		});

		test('logging in with a valid username and password', async () => {
			const response = await api
				.post('/auth/login')
				.send(userHelper.allUsers[0]).expect(200);

			expect(response.body.token).toBeDefined();
			
		});
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
