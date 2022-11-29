import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from '../components/Blog';
import userEvent from '@testing-library/user-event';

describe('blog tests',() => {

  test('Blog title must be displayed and all other info should not', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Thomas',
      url: 'home.com',
      likes: 10,
      userId: 'user',
    };
    const { container } = render(
      <Blog
        blog={blog}
        onBlogLike={() => console.log('Liking Blog')}
        onDeleteBlog={() => console.log('Deleting Blog')}
      />
    );
    const title = container.querySelector('.blog__title');
    const author = container.querySelector('.blog__author');
    const url = container.querySelector('.blog__url');
    const likes = container.querySelector('.blog__likes');

    expect(title).toHaveTextContent(blog.title);
    expect(author).toBe(null);
    expect(url).toBe(null);
    expect(likes).toBe(null);
  });

  test('show detail button click should display title,author,url and likes', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Thomas',
      url: 'home.com',
      likes: 10,
      userId: 'user',
    };

    const user = userEvent.setup();

    const { container } = render(
      <Blog
        blog={blog}
        onBlogLike={() => console.log('Liking Blog')}
        onDeleteBlog={() => console.log('Deleting Blog')}
      />
    );

    const button = container.querySelector('.blog__show__detail__button');
    await user.click(button);

    const title = container.querySelector('.blog__title');
    const author = container.querySelector('.blog__author');
    const url = container.querySelector('.blog__url');
    const likes = container.querySelector('.blog__likes');

    expect(title).toHaveTextContent(blog.title);
    expect(author).toHaveTextContent(blog.author);
    expect(url).toHaveTextContent(blog.url);
    expect(likes).toHaveTextContent(blog.likes);
  });

  test('when like button is clicked twice, it must be called twice', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Thomas',
      url: 'home.com',
      likes: 10,
      userId: 'user',
    };

    const mockHandler = jest.fn();
    const user = userEvent.setup();

    const { container } = render(
      <Blog
        blog={blog}
        onBlogLike={mockHandler}
        onDeleteBlog={() => console.log('Deleting Blog')}
      />
    );

    const button = container.querySelector('.blog__show__detail__button');
    await user.click(button);

    const likeButton = container.querySelector('.blog__like__button');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });



});
