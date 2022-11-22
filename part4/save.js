// // const listHelper = require('../utils/list_helper');
// // const api =

// // describe('total likes', () => {
// // 	//
// // 	const listWithNoBlog = [];

// // 	//
// // 	const listWithOneBlog = [
// // 		{
// // 			_id: '5a422aa71b54a676234d17f8',
// // 			title: 'Go To Statement Considered Harmful',
// // 			author: 'Edsger W. Dijkstra',
// // 			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// // 			likes: 5,
// // 			__v: 0,
// // 		},
// // 	];

// // 	//
// // 	const listWithMultipleBlogs = [
// // 		{
// // 			_id: '5a422a851b54a676234d17f7',
// // 			title: 'React patterns',
// // 			author: 'Michael Chan',
// // 			url: 'https://reactpatterns.com/',
// // 			likes: 7,
// // 			__v: 0,
// // 		},
// // 		{
// // 			_id: '5a422aa71b54a676234d17f8',
// // 			title: 'Go To Statement Considered Harmful',
// // 			author: 'Edsger W. Dijkstra',
// // 			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// // 			likes: 5,
// // 			__v: 0,
// // 		},
// // 		{
// // 			_id: '5a422b3a1b54a676234d17f9',
// // 			title: 'Canonical string reduction',
// // 			author: 'Edsger W. Dijkstra',
// // 			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
// // 			likes: 12,
// // 			__v: 0,
// // 		},
// // 	];

// // 	test('when list has no blog, equals 0', () => {
// // 		const result = listHelper.totalLikes(listWithNoBlog);
// // 		expect(result).toBe(0);
// // 	});

// // 	test('when list has only one blog, equals the likes of that', () => {
// // 		const result = listHelper.totalLikes(listWithOneBlog);
// // 		expect(result).toBe(5);
// // 	});

// // 	test('when list has multiple blogs, equals the sum likes of those', () => {
// // 		const result = listHelper.totalLikes(listWithMultipleBlogs);
// // 		expect(result).toBe(24);
// // 	});
// // });

// // describe('favorite blog', () => {
// // 	const blogs = [
// // 		{
// // 			_id: '5a422aa71b54a676234d17f8',
// // 			title: 'Go To Statement Considered Harmful',
// // 			author: 'Edsger W. Dijkstra',
// // 			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// // 			likes: 8,
// // 			__v: 0,
// // 		},
// // 		{
// // 			_id: '5a422aa71b54a676234d17f8',
// // 			title: 'Go To Statement Considered Harmful',
// // 			author: 'Edsger W. Dijkstra',
// // 			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// // 			likes: 5,
// // 			__v: 0,
// // 		},
// // 	];
// // 	test('when a blog has greater likes, it is the favorite', () => {
// // 		const result = listHelper.favoriteBlog(blogs);

// // 		expect(result).toEqual({
// // 			_id: '5a422aa71b54a676234d17f8',
// // 			title: 'Go To Statement Considered Harmful',
// // 			author: 'Edsger W. Dijkstra',
// // 			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// // 			likes: 8,
// // 			__v: 0,
// // 		});
// // 	});
// // });

// // describe('api test',()=>{
// // 	test('should first', () => { second })
// // });

// const supertest = require('supertest');
// const app = require('./app');
// const api = supertest();


// describe('api route tests',()=>{
//     test('should first', () => { second });
// });