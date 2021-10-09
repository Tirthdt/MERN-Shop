import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { register } from "../actions/authActions";
import FormContainer from "../components/FormContainer";

const RegisterScreen = ({ location, history }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.registerUser);
  const { userInfo, error, loading } = authSelector;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      setmessage("Name is required.");
      return;
    }
    if (email === "") {
      setmessage("Email is required.");
      return;
    }
    if (password === "") {
      setmessage("Password is required.");
      return;
    }
    if (password !== confirmpassword) {
      setmessage("Passwords do not match");
      return;
    }
    dispatch(register(name, email, password));
    setname("");
    setemail("");
    setpassword("");
    setmessage("");
    setconfirmpassword("");
  };

  return (
    <FormContainer>
      <h1>Register</h1>
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
          {loading ? <Loading></Loading> : "Register"}
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already a Customer?
          <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
