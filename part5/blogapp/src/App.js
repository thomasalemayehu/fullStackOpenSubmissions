import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import BlogDisplay from "./components/BlogsDisplay";
import {
  loginUser,
  saveAuthenticationToken,
  getAuthenticationToken,
  getUser,
  getAllBlogs,
  createBlog,
  clearAuthenticationToken,
  likeBlog,
  deleteBlog,
} from "./services/apiService";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";

function App() {
  // States

  const [user, setUser] = useState("");
  const [authenticationToken, setAuthenticationToken] = useState("");
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
    const [sortBy, setSortBy] = useState("title");


  // Fetches
  useEffect(() => {
    getAuthenticationToken()
      .then((token) => setAuthenticationToken(token))
      .catch((e) => setErrorMessage("Please Login"));

    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    getAllBlogs()
      .then((response) => {
        if (response.status === 200) {

          if(sortBy === "title"){
            setBlogs(blogs.sort((first, second) => second.likes - first.likes));
          }else if(sortBy === "likes"){
            setBlogs(blogs.sort((first, second) => first.likes - second.likes));
          }else{
            setBlogs(blogs.sort((first, second) => second.author - first.author));
          }
        }
      })
      .catch((e) => {
        if (e.response.status === 401 || e.response.status === 403) {
          setUser(null);
          setAuthenticationToken(null);
          setErrorMessage("Please Login");
        } else if (e.response.status === 404) {
          setErrorMessage("Server not live");
        }
      });
  }, [blogs, sortBy]);

  //

  // Event Handlers
  const onLoginFormSubmit = async (username, password) => {
    if (username === "") {
      setErrorMessage("Invalid username.");
    } else if (password === "") {
      setErrorMessage("Invalid password");
    } else {
      const loginRequest = await loginUser(username, password);
      if (loginRequest.status === 200) {
        const user = loginRequest.data;
        setAuthenticationToken(user?.token);
        saveAuthenticationToken(user);
        setUser(user);
        setErrorMessage("");
        setSuccessMessage("");

        const getBlogsRequest = await getAllBlogs();
        if (getBlogsRequest.status === 200) {
          setBlogs(blogs.concat(getBlogsRequest.data));
          setErrorMessage("");
          setSuccessMessage("");
        }
      } else {
        setSuccessMessage("");
        setErrorMessage(loginRequest.response.data.message);
      }
    }
  };

  const onNewBlogFormSubmit = (newBlog) => {
    createBlog(newBlog)
      .then((response) => {
        if (response.status === 201) {
          setBlogs(blogs.concat(newBlog));
          setErrorMessage("");
          setSuccessMessage("Blog Successfully created");
        }
      })
      .catch((e) => {
        setSuccessMessage("");
        setErrorMessage(e.response.data);
      });
  };

  const onLogout = async () => {
    await clearAuthenticationToken();
    setUser("");
    setAuthenticationToken("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const onBlogLike = async (blogId) => {
    const likeRequest = await likeBlog(blogId);

    if (likeRequest.status === 204) {
      setSuccessMessage("Blog liked.");
      const likedBlog = blogs.map((blog) => {
        if (blog.id === blogId) {
          return { ...blog, likes: blog.likes + 1 };
        }

        return blog;
      });
      setBlogs(likedBlog);
    }
  };

 
  const onSortBlogByNumberOfLikes = () => {
    setSortBy("likes");
  };

  const onSortBlogByTitle = () => {
    setSortBy("title");
  };

  const onSortBlogByAuthor = () => {
    setSortBy("author");
  };

  const onDeleteBlog = async(blogId) => {
    const deleteRequest = await deleteBlog(blogId);

    console.log(deleteRequest);
  }

  return (
    <div className="App">
      {authenticationToken ? (
        <>
          {errorMessage ? (
            <Notification message={errorMessage} messageType="error" />
          ) : successMessage ? (
            <Notification message={successMessage} messageType="success" />
          ) : (
            <> </>
          )}
          <Toggleable buttonLabel="Show Blogs" cancelButtonLabel="Hide Blogs">
            <BlogDisplay
              user={user}
              blogs={blogs}
              onLogout={onLogout}
              onDeleteBlog={onDeleteBlog}
              onBlogLike={onBlogLike}
              onSortBlogByTitle={onSortBlogByTitle}
              onSortBlogByNumberOfLikes={onSortBlogByNumberOfLikes}
              onSortBlogByAuthor={onSortBlogByAuthor}
            />
          </Toggleable>
          <Toggleable
            buttonLabel="Create Blog"
            cancelButtonLabel="Hide Blog Form"
          >
            <BlogForm onNewBlogFormSubmit={onNewBlogFormSubmit} />
          </Toggleable>
        </>
      ) : (
        <>
          {errorMessage ? (
            <Notification message={errorMessage} messageType="error" />
          ) : successMessage ? (
            <Notification message={successMessage} messageType="success" />
          ) : (
            <> </>
          )}
          <Toggleable buttonLabel="Login">
            <LoginForm
              onLoginFormSubmit={onLoginFormSubmit}
              cancelButtonLabel="Hide Login Form"
            />
          </Toggleable>
        </>
      )}
    </div>
  );
}

export default App;
