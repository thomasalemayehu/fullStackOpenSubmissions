import React from "react";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const allBlogs = useSelector((state) => state.blogs.allBlogs);
  const noBlogsStyle = {
    width: "100%",
    height: "500px",
    display: "grid",
    placeItems: "center",
    fontSize: "32px",
    fontStyle: "italic",
    fontWeight: "bold",
  };

  const blogCardStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "45px",
  };

  if (allBlogs && allBlogs.length > 0) {
    return (
      <div style={blogCardStyle}>
        {allBlogs.map(({ id, title, author, url, likes }) => (
          <BlogCard
            key={id}
            id={id}
            title={title}
            author={author}
            likes={likes}
            url={url}
          />
        ))}
      </div>
    );
  } else {
    return <div style={noBlogsStyle}>No Blogs</div>;
  }
};

export default BlogList;

// id, author, likes, title
