import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
const Navigation = () => {
  const navigationLinkStyle = {
    textDecoration: "none",
    color: "grey",
    padding: "0 12px",
  };

  const activeNavigationLinkStyle = {
    textDecoration: "underline",
    color: "grey",
    padding: "0 12px",
  };

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>📑Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? activeNavigationLinkStyle : navigationLinkStyle
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to="/new"
              style={({ isActive }) =>
                isActive ? activeNavigationLinkStyle : navigationLinkStyle
              }
            >
              Create New
            </NavLink>
            <NavLink
              to="/users"
              style={({ isActive }) =>
                isActive ? activeNavigationLinkStyle : navigationLinkStyle
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) =>
                isActive ? activeNavigationLinkStyle : navigationLinkStyle
              }
            >
              About
            </NavLink>
          </Nav>
        </Navbar.Collapse>

        <Button variant="warning" onClick={onLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default Navigation;
