const initialState = {
  allBlogs: [],
  detailBlog: {},
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "blog/getAllBlogs":
      return { allBlogs: action.payload };

    case "blog/getBlog":
      return { allBlogs: state.allBlogs.concat(action.payload) };

    case "blog/likeBlog":
      const allBlogs = state.allBlogs.map((blog) => {
        if (blog.id === action.payload) {
          return { ...blog, likes: blog.likes + 1 };
        }
        return blog;
      });

      return { allBlogs: allBlogs };

    case "blog/deleteBlog":
      const blogs = state.allBlogs.filter((blog) => blog.id !== action.payload);

      return { allBlogs: blogs };

    case "blog/saveDetailView":
      return { detailBlog: action.payload };

    case "blog/commentOnBlog":
      const newState = {
        ...state.detailBlog,
        comments: state.detailBlog.comments.concat(action.payload.comment),
      };

      return { detailBlog: newState };

    default:
      return state;
  }
};

export default blogReducer;
