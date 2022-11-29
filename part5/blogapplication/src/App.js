import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import BlogDisplay from './components/BlogsDisplay';
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
} from './services/apiService';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

function App() {
  // States

  const [user, setUser] = useState('');
  const [authenticationToken, setAuthenticationToken] = useState('');
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sortBy, setSortBy] = useState('title');


  // Fetches
  useEffect(() => {
    getAuthenticationToken()
      .then((token) => setAuthenticationToken(token))
      .catch(() => setErrorMessage('Please Login'));

    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    getAllBlogs()
      .then((response) => {
        if (response.status === 200) {
          if(sortBy === 'title'){
            setBlogs(response.data.sort((first, second) => second.likes - first.likes));
          }else if(sortBy === 'likes'){
            setBlogs(response.data.sort((first, second) => second.likes - first.likes));
          }else if(sortBy==='author'){
            setBlogs(response.data.sort((first, second) => second.author - first.author));
          }
        }
      })
      .catch((e) => {
        console.log(e.response.data);
        if (e.status === 401 || e.status === 403) {
          setUser(null);
          setAuthenticationToken(null);
          setErrorMessage('Please Login');
        } else if (e.status === 404) {
          setErrorMessage('Server not live');
        }
      });
  }, [sortBy]);

  //

  // Event Handlers
  const onLoginFormSubmit = async (username, password) => {
    if (username === '') {
      setErrorMessage('Invalid username.');
    } else if (password === '') {
      setErrorMessage('Invalid password');
    } else {
      try {
        const loginRequest = await loginUser(username, password);
        if (loginRequest.status === 200) {
          const user = loginRequest.data;
          await saveAuthenticationToken(user);
          setAuthenticationToken(user?.token);
          setUser(user);
          setErrorMessage('');
          setSuccessMessage('');

          const getBlogs = await getAllBlogs();

          if (getBlogs.status === 200) {
            if (sortBy === 'title') {
              setBlogs(
                getBlogs.data.sort(
                  (first, second) => second.likes - first.likes
                )
              );
            } else if (sortBy === 'likes') {
              setBlogs(
                getBlogs.data.sort(
                  (first, second) => second.likes - first.likes
                )
              );
            } else if (sortBy === 'author') {
              setBlogs(
                getBlogs.data.sort(
                  (first, second) => second.author - first.author
                )
              );
            }
          }
        } else {
          setSuccessMessage('');
          setErrorMessage(loginRequest.data.message);
        }
      } catch (e) {
        setSuccessMessage('');
        setErrorMessage(e.response.data.message);

      }
    }
  };

  const onNewBlogFormSubmit = (newBlog) => {
    createBlog(newBlog)
      .then((response) => {
        if (response.status === 201) {
          setBlogs(blogs.concat(newBlog));
          setErrorMessage('');
          setSuccessMessage('Blog Successfully created');
        }
      })
      .catch((e) => {
        setSuccessMessage('');
        setErrorMessage(e.response.data);
      });
  };

  const onLogout = async () => {
    await clearAuthenticationToken();
    setUser('');
    setAuthenticationToken('');
    setSuccessMessage('');
    setErrorMessage('');
  };

  const onBlogLike = async (blogId) => {
    try{
      const likeRequest = await likeBlog(blogId);

      if (likeRequest.status === 204) {
        setSuccessMessage('Blog liked.');
        const likedBlog = blogs.map((blog) => {
          if (blog.id === blogId) {
            return { ...blog, likes: blog.likes + 1 };
          }

          return blog;
        });
        setBlogs(likedBlog);
      }
    }catch(e){
      console.log(e.response.data.message);
    }
  };


  const onSortBlogByNumberOfLikes = () => {
    setSortBy('likes');
  };

  const onSortBlogByTitle = () => {
    setSortBy('title');
  };

  const onSortBlogByAuthor = () => {
    setSortBy('author');
  };

  const onDeleteBlog = async(blogId) => {
    try{
      const response = await deleteBlog(blogId);
      console.log(response.data);
      setBlogs(blogs.filter((blog) => blogId !== blog.id));
    }catch(e){
      console.log(e);
    }
  };

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
          <Toggleable buttonLabel="Show Login" cancelButtonLabel="Hide Login Form">
            <LoginForm onLoginFormSubmit={onLoginFormSubmit} />
          </Toggleable>
        </>
      )}
    </div>
  );
}

export default App;
