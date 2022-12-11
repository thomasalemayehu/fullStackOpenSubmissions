import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const NotificationContainer = () => {
  const notifications = useSelector(
    (state) => state.notifications.allNotifications
  );

  const notificationContainerStyle = {
    position: "absolute",
    width: "550px",
    height:'800px',
    overFlow:'scroll',
    top: "60px",
    right: "32px",
    zIndex: "1",
  };

  return (
    <div style={notificationContainerStyle}>
      {notifications.map(({ type, content, id }) => (
        <Notification key={id} id={id} type={type} content={content} />
      ))}
    </div>
  );
};

export default NotificationContainer;
