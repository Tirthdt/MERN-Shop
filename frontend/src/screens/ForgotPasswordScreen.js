import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";
import { resetUserPassword } from "../actions/authActions";
import { USER_RESET_PASSWORD_RESET } from "../actionTypes/authActions";

const ForgotPasswordScreen = ({ history }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("header").style.visibility = "hidden";
    document.querySelector("footer").style.visibility = "hidden";

    return () => {
      dispatch({ type: USER_RESET_PASSWORD_RESET });
      document.querySelector("header").style.visibility = "visible";
      document.querySelector("footer").style.visibility = "visible";
    };
  }, [dispatch]);

  const resetPwdSelector = useSelector((state) => state.resetPassword);
  const { success, error, loading } = resetPwdSelector;

  useEffect(() => {
    if (success) {
      setmessage("Password Reset Successfull");
    }
  }, [success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setErr("");

    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    dispatch(resetUserPassword({ email, password }));
    setemail("");
    setpassword("");
    setConfirmPassword("");
  };

  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      {(error || err) && (
        <Alert variant="danger" className="text-center">
          {error ? error : err}
        </Alert>
      )}
      {message && !loading && (
        <Alert variant="success" className="text-center">
          {message}
        </Alert>
      )}
      <Form onSubmit={onSubmitHandler}>
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="mt-3 btn-block" type="submit" variant="dark">
          {loading ? <Loading /> : "Change Password"}
        </Button>
        {message && !loading && (
          <Link
            style={{ display: "block" }}
            className="text-center"
            to="/login"
          >
            Go to login
          </Link>
        )}
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;
