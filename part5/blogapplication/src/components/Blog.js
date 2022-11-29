import React from 'react';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

const Blog = ({ blog, onBlogLike, onDeleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false);
  const mainStyle = {
    border: '1px solid black',
    margin: '8px 0',
    padding: '12px 6px',
  };
  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '17px',
  };
  const flexStyle = {
    display: 'flex',
    gap: '10px',
  };
  const buttonStyle = {
    fontSize: '10px',
  };
  const deleteButtonStyle = {
    background: '#F4978E',
    fontSize: '14px',
    padding: '4px 12px',
    outline: 'none',
  };
  return (
    <div style={mainStyle} className='blog__container'>
      <div style={flexStyle}>
        <div style={titleStyle} className="blog__title">{blog.title}</div>
        <button
          className='blog__show__detail__button'
          onClick={() => {
            setShowDetail(!showDetail);
          }}
        >
          {showDetail ? 'Hide Detail' : 'Show Detail'}
        </button>
      </div>

      {showDetail ? (
        <>
          <div className='blog__url'>{blog.url}</div>
          <div style={flexStyle}>
            <div className='blog__likes'>Likes : {blog.likes} </div>
            <button style={buttonStyle} className='blog__like__button' onClick={() => onBlogLike(blog.id)}>
              Like
            </button>
          </div>

          <div className='blog__author'>{blog.author}</div>

          <br />

          <button
            className='blog__delete__button'
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
};

Blog.propType = {
  blog:PropTypes.object.isRequired,
  onBlogLike:PropTypes.func.isRequired,
  onDeleteBlog:PropTypes.func.isRequired,
};

export default Blog;
