import React from "react";
import { Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { createNewBlog } from "../../services/blog";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewNotificationAction } from "../../state/actions/notification";
const CreateBlog = () => {
  const formStyle = {
    width: "70%",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const titleRef = useRef();
  const authorRef = useRef();
  const urlRef = useRef();

  const onCreateNewBlog = () => {
    createNewBlog({
      title: titleRef.current.value,
      url: urlRef.current.value,
      author: authorRef.current.value,
    })
      .then((response) => {
        titleRef.current.value = "";
        urlRef.current.value = "";
        authorRef.current.value = "";
        navigate("/");
      })
      .catch((e) => dispatch(addNewNotificationAction('error',e.response.data.error)));
  };
  return (
    <>
      <h1>🚀 Create New Blog</h1>
      <Form style={formStyle} className="mt-5">
        {/* Title */}
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" ref={titleRef} />
        </Form.Group>

        {/* Author */}
        <Form.Group className="mb-4" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author"
            ref={authorRef}
          />
        </Form.Group>

        {/* Url */}
        <Form.Group className="mb-4" controlId="formBasicUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control type="text" placeholder="Enter Url" ref={urlRef} />
        </Form.Group>

        <Button className="px-5 mt-3" onClick={onCreateNewBlog}>
          Create Blog
        </Button>
      </Form>
    </>
  );
};

export default CreateBlog;
