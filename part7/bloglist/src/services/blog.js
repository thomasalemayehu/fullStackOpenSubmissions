import axios from "axios";

let authToken = "";

const setAuthToken = (token) => {
  console.log("Auth Token Set ", token);
  authToken = `bearer ${token}`;
};

const getAuthToken = () => {
  if (authToken && authToken !== "bearer ") {
    return authToken;
  } else {
    const userInfo = JSON.parse(localStorage.getItem("loggedInUser"));

    if (userInfo) {
      authToken = `bearer ${userInfo.token}`;
    }
  }

  return authToken;
};

const getAllBlogs = () => {
  const token = getAuthToken();
  const request = axios.get("/api/blogs", {
    headers: {
      Authorization: token,
    },
  });
  return request;
};

const createNewBlog = (blogInfo) => {
  const token = getAuthToken();
  const request = axios.post("/api/blog", blogInfo, {
    headers: {
      Authorization: token,
    },
  });

  return request;
};

const likeBlog = (blogId) => {
  const token = getAuthToken();
  const request = axios.get(`/api/blog/like/${blogId}`, {
    headers: {
      Authorization: token,
    },
  });

  return request;
};

const deleteBlog = (blogId) => {
  const token = getAuthToken();
  const request = axios.delete(`/api/blog/${blogId}`, {
    headers: {
      Authorization: token,
    },
  });

  return request;
};

const getBlogById = (blogId) => {
  const token = getAuthToken();
  const request = axios.get(`/api/blog/${blogId}`, {
    headers: {
      Authorization: token,
    },
  });

  return request;
};

const addCommentToBlog= (blogId,comment) =>{
   const token = getAuthToken();
   const request = axios.post(`/comment/${blogId}`,{comment:comment}, {
     headers: {
       Authorization: token,
     },
   });

   return request;
}

export {
  setAuthToken,
  getAllBlogs,
  createNewBlog,
  likeBlog,
  deleteBlog,
  getBlogById,
  addCommentToBlog
};
