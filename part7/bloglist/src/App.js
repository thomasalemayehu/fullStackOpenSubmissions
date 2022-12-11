import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SharedAuthenticatedLayout from "./pages/blog/SharedAuthenticatedLayout";
import Home from "./pages/blog/Home";
import CreateBlog from "./pages/blog/CreateBlog";
import About from "./pages/blog/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { React } from "react";
import Users from "./pages/blog/Users";
import NotificationContainer from "./components/NotificationContainer";
import UserView from "./pages/blog/UserView";
import BlogView from "./pages/blog/BlogView";

function App() {
  const userInfo = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <div className="App">
      <NotificationContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              userInfo ? (
                <SharedAuthenticatedLayout />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<Home />} />
            <Route path="new" element={<CreateBlog />} />
            <Route path="about" element={<About />} />
            <Route path="users" element={<Users />} />
            <Route path="user/:id" element={<UserView />} />
            <Route path="blog/:id" element={<BlogView />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
