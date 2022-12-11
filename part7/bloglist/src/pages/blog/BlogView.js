import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogCard from "./components/BlogCard";
import { addCommentToBlog, getBlogById } from "../../services/blog";
import { saveBlogDetailAction } from "../../state/actions/blog";
import CommentCard from "./components/CommentCard";
import { Form, Button } from "react-bootstrap";
import { commentOnBlogAction } from "../../state/actions/blog";
import { addNewNotificationAction } from "../../state/actions/notification";
const BlogView = () => {
  const blogId = useParams().id;

  const dispatch = useDispatch();

  useEffect(() => {
    getBlogById(blogId)
      .then((response) => dispatch(saveBlogDetailAction(response.data)))
      .catch((e) =>
        dispatch(addNewNotificationAction("error", e.response.data.error))
      );
  }, [dispatch, blogId]);

  const onAddComment = () => {
    addCommentToBlog(blogId, commentRef.current.value)
      .then((response) => {
        dispatch(commentOnBlogAction(blogId, response.data));
      })
      .catch((e) =>
        dispatch(addNewNotificationAction("error", e.response.data.error))
      );
  };

  const commentRef = useRef();
  const blog = useSelector((state) => state.blogs.detailBlog);

  if (blog && blog.comments) {
    const { id, title, url, author, likes, comments } = blog;
    return (
      <>
        <h3 className="mb-5">🔥 {title}</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BlogCard
            id={id}
            author={author}
            url={url}
            likes={likes}
            title={title}
          />

          <div
            style={{
              width: "35rem",
              height: "800px",
              overflowY: "auto",
              padding: "4px 8px",
            }}
          >
            {comments.map(({ id, comment, timestamp, user }) => (
              <CommentCard
                key={id}
                id={id}
                comment={comment}
                timestamp={timestamp}
                username={user ? user.username : "Anonymous"}
              />
            ))}
          </div>
        </div>

        <Form>
          {/* Email */}
          <Form.Group className="mb-4" controlId="formBasicComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Comment"
              ref={commentRef}
            />

            <Button className="mt-4" onClick={onAddComment}>
              Add Comment
            </Button>
          </Form.Group>
        </Form>
      </>
    );
  }

  return (
    <>
      <h1>Could not get info</h1>
    </>
  );
};

export default BlogView;
