const saveAllBlogsAction = (allBlogs) => {
  return {
    type: "blog/getAllBlogs",
    payload: allBlogs,
  };
};

const saveBlogAction = (blog) => {
  return {
    type: "blog/getBlog",
    payload: blog,
  };
};

const likeBlogAction = (id) => {
  return {
    type: "blog/likeBlog",
    payload: id,
  };
};

const deleteBlogAction = (id) => {
  return {
    type: "blog/deleteBlog",
    payload: id,
  };
};

const saveBlogDetailAction = (info) =>{
  return {
    type: "blog/saveDetailView",
    payload:info,
  };
}

const commentOnBlogAction = (blogId, comment) => {
  return {
    type: "blog/commentOnBlog",
    payload: {
      blogId: blogId,
      comment: comment,
    },
  };
};

export {
  saveAllBlogsAction,
  saveBlogAction,
  likeBlogAction,
  deleteBlogAction,
  saveBlogDetailAction,
  commentOnBlogAction,
};
