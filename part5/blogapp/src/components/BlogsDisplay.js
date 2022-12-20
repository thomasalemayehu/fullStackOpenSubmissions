import React from "react";
import Blog from "./Blog";

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
    display: "flex",
    gap: "12px",
  };
  if (blogs.length > 0) {
    return (
      <>
        <h3>{user?.username} logged in.</h3>

        <button onClick={onLogout}> Logout</button>

        <hr />

        <div style={flexStyle}>
          <button onClick={onSortBlogByNumberOfLikes}>Sort By Likes</button>
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
        <h3>{user?.username} logged in.</h3>

        <button onClick={onLogout}> Logout</button>
        <h1>No Blogs</h1>
      </>
    );
  }
}

export default BlogDisplay;
