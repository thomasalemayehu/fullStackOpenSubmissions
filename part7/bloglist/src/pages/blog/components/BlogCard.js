import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

import { deleteBlogAction, likeBlogAction } from "../../../state/actions/blog";
import { likeBlog, deleteBlog } from "../../../services/blog";
import { addNewNotificationAction } from "../../../state/actions/notification";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteUserBlogAction,
  likeUserBlogAction,
} from "../../../state/actions/user";

const BlogCard = ({ id, author, likes, title, url }) => {
  const dispatch = useDispatch();

  const onBlogLike = (id) => {
    likeBlog(id)
      .then(() => {
        dispatch(likeBlogAction(id));
        dispatch(likeUserBlogAction(id));
      })
      .catch((e) =>
        dispatch(addNewNotificationAction("error", e.response.data.error))
      );
  };
  const onBlogDelete = (id) => {
    deleteBlog(id)
      .then((response) => {
        if (response.status === 204) {
          dispatch(deleteBlogAction(id));
          dispatch(deleteUserBlogAction(id));
          dispatch(addNewNotificationAction("success", "Blog Deleted"));
        }
      })
      .catch((e) =>
        dispatch(addNewNotificationAction("error", e.response.data.error))
      );
  };

  const titleStyle = {
    fontSize: "17px",
    overflow: "hidden",
    minHeight: "65px",
    maxHeight: "65px",
    wordWrap: "break-word",
    textOverflow: "ellipsis",
  };

  const clickableStyle = {
    cursor: "pointer",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <Card style={{ width: "20rem", height: "14rem" }} className="pt-3">
      <Card.Body>
        <Link to={`/blog/${id}`} style={linkStyle}>
          <Card.Title style={titleStyle}>{title}</Card.Title>
        </Link>

        <Card.Text>
          By: <em>{author}</em>
        </Card.Text>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "space-between",
            margin: "32px 0px 0px 0px",
          }}
        >
          <div style={{ display: "flex", fontSize: "22px" }}>
            <div>{likes}</div>
            <div
              onClick={() => {
                onBlogLike(id);
              }}
              style={clickableStyle}
            >
              👍
            </div>
          </div>
          <a href={url} target="_blank" style={{ fontSize: "22px" }} rel="noreferrer">
            🔗
          </a>
          <div
            onClick={() => {
              onBlogDelete(id);
            }}
            style={{
              fontSize: "22px",
              margin: "0px 0px 0px 30px",
              cursor: "pointer",
            }}
          >
            ❌
          </div>
        </div>
      </Card.Body>
      <div style={{ width: "100%", height: "4px", background: "red" }}></div>
    </Card>
  );
};

BlogCard.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default BlogCard;
