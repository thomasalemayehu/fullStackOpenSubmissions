import React, { useEffect } from "react";
import { getAllBlogs } from "../../services/blog";
import BlogList from "./components/BlogList";
import { useDispatch } from "react-redux";
import { saveAllBlogsAction } from "../../state/actions/blog";
import { addNewNotificationAction } from "../../state/actions/notification";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllBlogs()
      .then((response) => dispatch(saveAllBlogsAction(response.data)))
      .catch((error) => addNewNotificationAction(error.response.data.message));
  }, [dispatch]);

  return (
    <>
      <h1 className="mb-4">📑 Blogs</h1>
      <BlogList/>
      
    </>
  );
};

export default Home;
