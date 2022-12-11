import React from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeNotificationAction } from "../state/actions/notification";
import { useEffect } from "react";
const Notification = ({ id, type, content }) => {
  const notificationStyle = {
    display: "flex",
    width: "100%",
    position: "relative",
  };

  const alertStyle = {
    width: "100%",
  };

  const dispatch = useDispatch();

  const closeButton = {
    position: "absolute",
    right: "12px",
    top: "4px",
    color: "red",
    fontSize: "18px",
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotificationAction(id));
    }, 5000);
  }, [id, dispatch]);

  return (
    <div key={id} style={notificationStyle}>
      <Alert variant="danger" style={alertStyle}>
        {" "}
        {content}
      </Alert>
      <span
        style={closeButton}
        onClick={() => {
          dispatch(removeNotificationAction(id));
        }}
      >
        X
      </span>
    </div>
  );
};

export default Notification;
