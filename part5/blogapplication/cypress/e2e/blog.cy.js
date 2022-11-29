/* eslint-disable no-undef */
// /* eslint-disable no-undef */
const users = [
  {
    username: 'Thomas',
    password: 'mypasswordisgood',
  },
  {
    username: 'Abel',
    password: 'mypasswordisbad',
  },
];

const blogs = [
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


const likeBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 100,
  },

  {
    title: 'Go To Statement Considered Harm',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 50,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 10,
  },
];


Cypress.Commands.add('login',({ username,password }) => {
  cy.request('POST', 'http://localhost:5000/auth/login', {
    username:username,
    password:password,
  }).then(({ body }) => {
    localStorage.setItem('userInfo', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('register', ({ username,password }) => {
  cy.request('POST', 'http://localhost:5000/auth/register', {
    username,
    password,
  });
});

Cypress.Commands.add('createBlog', ({ title, author,url }) => {
  cy.request({
    url: 'http://localhost:5000/api/blog',
    method: 'POST',
    body: { title,author,url,likes:0 },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('userInfo')).token
      }`,
    },
  });

  cy.visit('http://localhost:3000');
});

describe('Blog app', function () {

  beforeEach(function () {
    cy.request('DELETE', 'http://localhost:5000/test/reset');
  });

  describe('login form',function(){
  //   beforeEach(function () {
  //     cy.visit('http://localhost:3000');
  //   });

    //   it('Login form is shown', function () {
    //     cy.get('.toggleable__show__button').click();
    //     cy.get('#loginForm').should('be.visible');
    //   });
    // });

    // describe('Login', function () {
    //   beforeEach(function(){
    //     cy.request('POST', 'http://localhost:5000/auth/register', users[0]);
    //     cy.request('POST', 'http://localhost:5000/auth/register', users[1]);
    //     cy.visit('http://localhost:3000');

    //     //
    //     cy.get('.toggleable__show__button').click();
    //   });
    //   it('succeeds with correct credentials', function () {
    //     cy.get('#usernameInput').clear().type(users[0].username);
    //     cy.get('#passwordInput').clear().type(users[0].password);

    //     cy.get('#loginButton').click();
    //     cy.get('.blog__display__user__info').contains(`${users[0].username}`);
    //   });

    //   it('fails with wrong credentials', function () {
    //     cy.get('#usernameInput').clear().type(users[0].username);
    //     cy.get('#passwordInput').clear().type(users[1].password);

    //     cy.get('#loginButton').click();

    //     cy.get('.notification__container').as('notificationComponent');
    //     cy.get('@notificationComponent').should('have.css', 'color', 'rgb(255, 0, 0)');
    //     cy.get('@notificationComponent').should(
    //       'have.css',
    //       'border-style',
    //       'solid'
    //     );
    //   });
    // });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.register({ username:users[0].username,password:users[0].password });
        cy.register({ username: users[1].username, password: users[1].password });
        cy.login({ username:users[0].username,password:users[0].password });
      });

      // it('A blog can be created', function () {
      //   cy.contains('Show Blogs').click();
      //   cy.contains('No Blogs');

      //   cy.contains('Create Blog').click();
      //   cy.get('#blogForm').should('be.visible');

      //   cy.get('#blogTitleInput').clear().type(blogs[0].title);
      //   cy.get('#blogAuthorInput').clear().type(blogs[0].author);
      //   cy.get('#blogUrlInput').clear().type(blogs[0].url);

      //   cy.get('#createBlogButton').click();


      //   cy.get('.notification__container').as('notificationComponent');
      //   cy.get('@notificationComponent').should('have.css', 'color', 'rgb(0, 128, 0)');
      //   cy.get('@notificationComponent').should(
      //     'have.css',
      //     'border-style',
      //     'solid'
      //   );

      //   cy.contains(blogs[0].title);
      // });

      // it('A blog can be liked', function () {
      //   cy.createBlog({ title:blogs[0].title,author:blogs[0].author,url:blogs[0].url });
      //   cy.contains('Show Blogs').click();
      //   cy.contains(blogs[0].title).parent().find('button').click();
      //   cy.contains(`Likes : ${blogs[0].likes}`).parent().find('button').click();
      //   cy.contains(`Likes : ${blogs[0].likes + 1}`);
      //   cy.contains(`Likes : ${blogs[0].likes + 1}`).parent().find('button').click();
      //   cy.contains(`Likes : ${blogs[0].likes + 2}`);
      // });

      // it('A blog can be deleted by the user who created it', function () {
      //   cy.createBlog({
      //     title: blogs[0].title,
      //     author: blogs[0].author,
      //     url: blogs[0].url,
      //   });
      //   cy.createBlog({
      //     title: blogs[1].title,
      //     author: blogs[1].author,
      //     url: blogs[1].url,
      //   });
      //   cy.contains('Show Blogs').click();
      //   cy.contains(blogs[0].title).parent().find('button').click();
      //   cy.get('.blog__delete__button').should('be.visible').click();
      //   cy.contains(blogs[0].title).should('not.exist');
      //   cy.contains(blogs[1].title);
      // });

      // it('A blog can not be deleted by the user who did not create it', function () {
      //   cy.createBlog({
      //     title: blogs[0].title,
      //     author: blogs[0].author,
      //     url: blogs[0].url,
      //   });
      //   cy.createBlog({
      //     title: blogs[1].title,
      //     author: blogs[1].author,
      //     url: blogs[1].url,
      //   });

      //   cy.login({ username:users[1].username,password:users[1].password });
      //   cy.contains('Show Blogs').click();

      //   cy.contains(`${users[1].username} logged in`);
      //   cy.contains(blogs[0].title).parent().find('button').click();
      //   cy.get('.blog__delete__button').should('be.visible').click();
      //   cy.contains(blogs[0].title);
      //   cy.contains(blogs[1].title);

      it('Blogs can be sorted by Likes', function () {
        cy.createBlog({
          title: likeBlogs[0].title,
          author: likeBlogs[0].author,
          url: likeBlogs[0].url,
          likes: likeBlogs[0].likes,
        });
        cy.createBlog({
          title: likeBlogs[1].title,
          author: likeBlogs[1].author,
          url: likeBlogs[1].url,
          likes: likeBlogs[1].likes,
        });
        cy.createBlog({
          title: likeBlogs[2].title,
          author: likeBlogs[2].author,
          url: likeBlogs[2].url,
          likes:likeBlogs[2].likes,
        });
        cy.contains('Show Blogs').click();
        cy.contains(blogs[2].title).parent().find('button').click();
        cy.contains(`Likes : ${blogs[2].likes}`).parent().find('button').click();
        cy.contains(`Likes : ${blogs[2].likes + 1}`);
        cy.contains(`Likes : ${blogs[2].likes + 1}`).parent().find('button').click();
        cy.contains(`Likes : ${blogs[2].likes + 2}`);

        cy.contains(blogs[0].title).parent().find('button').click();
        cy.contains(`Likes : ${blogs[0].likes}`)
          .parent()
          .find('button')
          .click();
        cy.contains(`Likes : ${blogs[0].likes + 1}`);
        cy.contains('Sort By Likes').click();

        //
        cy.get('.blog__container').eq(0).should('contain',blogs[2].title);
        cy.get('.blog__container').eq(1).should('contain', blogs[0].title);
        cy.get('.blog__container').eq(2).should('contain', blogs[1].title);
      });
    });
  });
});