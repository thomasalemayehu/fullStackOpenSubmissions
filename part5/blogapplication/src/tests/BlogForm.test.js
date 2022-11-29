import BlogForm from './../components/BlogForm';
import { render,screen } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';

describe('Blog form tests',() => {
  test('new blog should be created with proper info', async () => {
    const newBlog = {
      title: 'new blog ...',
      author: 'new author ...',
      url: 'new url ...',
      likes: 0,
    };
    const submitMockHandler = jest.fn();
    const user = userEvent.setup();

    const { container } = render(
      <BlogForm onNewBlogFormSubmit={submitMockHandler} />
    );

    const inputs = screen.getAllByRole('textbox');

    //   blog title
    await user.type(inputs[0], newBlog.title);
    // blog author
    await user.type(inputs[1], newBlog.author);

    //   blog url
    await user.type(inputs[2], newBlog.url);

    const submitButton = container.querySelector('#submit__button');
    await user.click(submitButton);

    //   input
    const submitInfo = submitMockHandler.mock.calls[0][0];
    expect(submitInfo.title).toBe(newBlog.title);
    expect(submitInfo.author).toBe(newBlog.author);
    expect(submitInfo.url).toBe(newBlog.url);
    expect(submitInfo.likes).toBe(newBlog.likes);
    expect(submitMockHandler.mock.calls).toHaveLength(1);
  });
});