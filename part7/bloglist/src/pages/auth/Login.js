import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import { setAuthToken } from "../../services/blog";
import { useDispatch } from "react-redux";
import { addNewNotificationAction } from "../../state/actions/notification";
import { saveAllUsersAction } from "../../state/actions/user";
const Login = ({ setNotification }) => {
  const loginContainer = {
    width: "100vw",
    height: "100vh",
    // background: "red",
    display: "grid",
    placeItems: "center",
  };

  const loginForm = {
    width: "550px",
    height: "500px",
    background: "gray",
    padding: "40px",
    borderRadius: "16px",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const onFormSubmit = async () => {
    try {
      const loginRequest = await loginUser({
        username: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (loginRequest.status === 200) {
        setAuthToken(loginRequest.data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(loginRequest.data));
        dispatch(saveAllUsersAction(loginRequest.data));
        emailRef.current.value = "";
        passwordRef.current.value = "";
        navigate("/");
      }
    } catch (e) {
      dispatch(addNewNotificationAction("error", e.response.data.error));
    }
  };

  return (
    <div style={loginContainer}>
      <div style={loginForm}>
        <h1 className="mb-5">📑 Blog App</h1>
        <Form>
          {/* Email */}
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>📨 Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>🔑 Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={passwordRef}
            />
          </Form.Group>

          <Button className="px-5 mt-3" onClick={onFormSubmit}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
