import axios from "axios";

const loginUser = async (username, password) => {
  const request = axios.post("/auth/login", {
    username: username,
    password: password,
  });
  return request;
};

const getAuthenticationToken = async () => {
  const user = window.localStorage.getItem("userInfo");

  if (user) {
    const { token } = JSON.parse(user);

    return token;
  }

  return "";
};

const getUser = async () => {
  let user = window.localStorage.getItem("userInfo");

  if (user) {
    user = JSON.parse(user);

    return user;
  }

  return "";
};

const persistAuthenticationToken = async (user) => {
  window.localStorage.setItem("userInfo", JSON.stringify(user));
};

const saveAuthenticationToken = async (token) => {
  await persistAuthenticationToken(token);
};

const clearAuthenticationToken = async () => {
  window.localStorage.removeItem("userInfo");
};

const getAllBlogs = async () => {
  const authenticationToken = await getAuthenticationToken();
  const request = axios.get("/api/blogs", {
    headers: {
      Authorization: `bearer ${authenticationToken}`,
    },
  });

  return request;
};

const createBlog = async (blog) => {
  const authenticationToken = await getAuthenticationToken();
  const request = axios.post("/api/blog", blog, {
    headers: {
      Authorization: `bearer ${authenticationToken}`,
      "Content-Type": "application/json",
    },
  });

  return request;
};

const likeBlog = async (blogId) => {
  const authenticationToken = await getAuthenticationToken();
  const request = axios.put(`/api/blog/like/${blogId}`, {
    headers: {
      Authorization: `bearer ${authenticationToken}`,
      "Content-Type": "application/json",
    },
  });

  return request;
};

const deleteBlog = async (blogId) => {
  const authenticationToken = await getAuthenticationToken();
  const request = axios.delete(`/api/blog/${blogId}`, {
    headers: {
      Authorization: `bearer ${authenticationToken}`,
    },
  });

  return request;
};
export {
  loginUser,
  getAuthenticationToken,
  saveAuthenticationToken,
  clearAuthenticationToken,
  getUser,

  //
  getAllBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
};
