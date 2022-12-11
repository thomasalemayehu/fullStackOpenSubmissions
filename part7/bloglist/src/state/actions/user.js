const saveCurrentUserAction = (username, id, token) => {
  return {
    type: "user/saveCurrentUser",
    payload: { id, username, token },
  };
};

const saveAllUsersAction = (allUsers) => {
  return {
    type: "user/saveAllUsers",
    payload: allUsers,
  };
};

const likeUserBlogAction = (id) => {
  return {
    type: "user/likeBlog",
    payload: id,
  };
};

const deleteUserBlogAction = (id) => {
  return {
    type: "user/deleteBlog",
    payload: id,
  };
  
};



export {
  saveCurrentUserAction,
  saveAllUsersAction,
  likeUserBlogAction,
  deleteUserBlogAction,
};
