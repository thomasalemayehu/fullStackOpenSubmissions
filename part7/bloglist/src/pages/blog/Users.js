import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../services/user";
import { saveAllUsersAction } from "../../state/actions/user";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { addNewNotificationAction } from "../../state/actions/notification";
const Users = () => {
  const allUsers = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers()
      .then((response) => dispatch(saveAllUsersAction(response.data)))
      .catch((e) =>
        dispatch(addNewNotificationAction("error", e.response.data.error))
      );
  }, [dispatch]);
  if (allUsers && allUsers.length > 0) {
    return (
      <>
        <h1>👤 Users</h1>
        <div style={{ display: "flex", gap: "45px" }}>
          {allUsers.map(({ id, blogs, username }) => (
            <NavLink
              to={`/user/${id}`}
              key={id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card
                style={{ width: "18rem", height: "15rem" }}
                className="pt-2 mt-4"
              >
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card.Img
                      src="https://images-platform.99static.com//5_oXjjUVqCOk-6snmE7s_cdr-dI=/229x0:1041x812/fit-in/590x590/99designs-contests-attachments/47/47482/attachment_47482097"
                      style={{
                        width: "85px",
                        height: "85px",

                        margin: "auto 0",
                      }}
                    ></Card.Img>
                  </div>
                  <Card.Title style={{ fontSize: "16px", margin: "12px 0" }}>
                    {username}
                  </Card.Title>

                  <Card.Text style={{ fontSize: "14px", fontWeight: "bold" }}>
                    <em>{blogs.length}</em> blogs
                  </Card.Text>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "space-between",
                      margin: "32px 0px 0px 0px",
                    }}
                  ></div>
                </Card.Body>
                <div
                  style={{ width: "100%", height: "4px", background: "red" }}
                ></div>
              </Card>
            </NavLink>
          ))}
        </div>
      </>
    );
  } else {
    return <>No Users</>;
  }
};

export default Users;
