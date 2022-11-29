import React from 'react';
import Blog from './Blog';

function BlogDisplay({
  user,
  blogs,
  onLogout,
  onDeleteBlog,
  onBlogLike,
  onSortBlogByNumberOfLikes,
  onSortBlogByTitle,
  onSortBlogByAuthor,
}) {
  const flexStyle = {
    display: 'flex',
    gap: '12px',
  };
  if (blogs.length > 0) {
    return (
      <>
        <h3 className='blog__display__user__info'>{user?.username} logged in.</h3>

        <button onClick={onLogout}> Logout</button>

        <hr />

        <div style={flexStyle}>
          <button onClick={onSortBlogByNumberOfLikes} className='sort__by__likes'>Sort By Likes</button>
          <button onClick={onSortBlogByTitle}>Sort By Title</button>
          <button onClick={onSortBlogByAuthor}>Sort By Author</button>
        </div>
        <div>
          <br />
          {blogs.map((blog) => (
            <Blog
              blog={blog}
              key={blog.id}
              onBlogLike={onBlogLike}
              onDeleteBlog={onDeleteBlog}
            />
          ))}
        </div>

        <br />
        <hr />
      </>
    );
  } else {
    return (
      <>
        <h3 className="blog__display__user__info" >
          {user?.username} logged in.
        </h3>

        <button  className='logout__button' onClick={onLogout}> Logout</button>
        <h1 className='no__blogs__display'>No Blogs</h1>
      </>
    );
  }
}

export default BlogDisplay;
