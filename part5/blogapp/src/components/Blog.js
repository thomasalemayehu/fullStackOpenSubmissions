import React from "react";
import { useState } from "react";

function Blog({ blog, onBlogLike, onDeleteBlog }) {
  const [showDetail, setShowDetail] = useState(false);
  const mainStyle = {
    border: "1px solid black",
    margin: "8px 0",
    padding: "12px 6px",
  };
  const titleStyle = {
    fontWeight: "bold",
    fontSize: "17px",
  };
  const flexStyle = {
    display: "flex",
    gap: "10px",
  };
  const buttonStyle = {
    fontSize: "10px",
  };
  const deleteButtonStyle = {
    background: "#F4978E",
    fontSize: "14px",
    padding: "4px 12px",
    outline: "none",
  };
  return (
    <div style={mainStyle}>
      <div style={flexStyle}>
        <div style={titleStyle}>{blog.title}</div>
        <button
          onClick={() => {
            setShowDetail(!showDetail);
          }}
        >
          {showDetail ? "Hide Detail" : "Show Detail"}
        </button>
      </div>

      {showDetail ? (
        <>
          <div>{blog.url}</div>
          <div style={flexStyle}>
            <div>Likes : {blog.likes} </div>
            <button style={buttonStyle} onClick={() => onBlogLike(blog.id)}>
              Like
            </button>
          </div>

          <div>{blog.author}</div>

          <br />

          <button
            style={deleteButtonStyle}
            onClick={() => {
              onDeleteBlog(blog.id);
              // console.log(blog.id)
            }}
          >
            Delete Blog
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Blog;
