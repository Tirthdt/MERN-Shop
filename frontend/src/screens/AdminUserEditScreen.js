import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { getUserDetails } from "../actions/authActions";
import FormContainer from "../components/FormContainer";

const AdminUserEditScreen = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.registerUser);
  const { userInfo, error, loading } = authSelector;

  const onSubmitHandler = () => {
    console.log("update user");
  };

  return (
    <FormContainer>
      <h1>Update</h1>
      {(error || message) && (
        <Alert variant="danger" className="text-center">
          {message ? message : error}
        </Alert>
      )}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="mt-3 btn-block" type="submit" variant="dark">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminUserEditScreen;
