import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

const BlogForm = ({ onNewBlogFormSubmit }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  });

  const onBlogTitleChange = (e) =>
    setNewBlog({ ...newBlog, title: e.target.value });
  const onBlogAuthorChange = (e) =>
    setNewBlog({ ...newBlog, author: e.target.value });
  const onBlogUrlChange = (e) =>
    setNewBlog({ ...newBlog, url: e.target.value });
  return (
    <form
      id='blogForm'
      onSubmit={(e) => {
        e.preventDefault();
        onNewBlogFormSubmit(newBlog);
      }}
    >
      <h3>Create new Blog</h3>
      <div>
        <label htmlFor="blogTitle">Title: </label>
        <input
          type="text"
          name="blogTitle"
          id='blogTitleInput'
          value={newBlog.title}
          onChange={onBlogTitleChange}
        />
      </div>
      <br />

      <div>
        <label htmlFor="blogAuthor">Author: </label>
        <input
          type="text"
          name="blogAuthor"
          id='blogAuthorInput'
          value={newBlog.author}
          onChange={onBlogAuthorChange}
        />
      </div>

      <br />

      <div>
        <label htmlFor="blogUrl">Url: </label>
        <input
          type="text"
          name="blogUrl"
          id='blogUrlInput'
          value={newBlog.url}
          onChange={onBlogUrlChange}
        />
      </div>

      <br />

      <input type="submit" value="Create" id='createBlogButton'/>
    </form>
  );
};

BlogForm.propTypes = {
  onNewBlogFormSubmit:PropTypes.func.isRequired
};

export default BlogForm;
