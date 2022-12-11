const initialState = {
  currentUser: {},
  allUsers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "user/saveCurrentUser":
      return { currentUser: action.payload };

    case "user/saveAllUsers":
      return { allUsers: action.payload };

    case "user/likeBlog":
      state.allUsers.map((user) => {
        return user.blogs.map((blog) => {
          if (blog.id === action.payload) {
            blog.likes++;
          }

          return blog;
        });
      });

      return state;

    case "user/deleteBlog":
      const users = state.allUsers.map((user) => {
        const blogs = user.blogs.filter((blog) => blog.id !== action.payload);

        return { ...user, blogs: blogs };
      });

      return { allUsers: users };

   
    default:
      return state;
  }
};

export default userReducer;
