import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogCard from './components/BlogCard';

const UserView = () => {
  const userId = useParams().id;

  
  const user = useSelector((state) =>
    state.user.allUsers.filter((user) => user.id === userId)
  )[0];

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

  if(user){

    return (
      <>
        <h3 className="mb-5">✍️ {user.username}</h3>
  
        {user.blogs.length > 0 ? (
          <div style={blogCardStyle}>
            {user.blogs.map(({ id, author, likes, title, url }) => (
              <BlogCard
              key={id}
                id={id}
                author={author}
                likes={likes}
                title={title}
                url={url}
              />
            ))}
          </div>
        ) : (
          <div style={noBlogsStyle}>No Blogs</div>
        )}
      </>
    );
  }else{
    return <>
    <h1>Could not get info</h1>
    </>
  }
};

export default UserView;
