import { createStore } from "redux";
import { combineReducers } from "redux";
import blogReducer from "./reducers/blog";
import notificationReducer from './reducers/notification';
import userReducer from './reducers/user';

const reducer = combineReducers({
  blogs: blogReducer,
  notifications:notificationReducer,
  user:userReducer
});

const store = createStore(reducer);


export default store;