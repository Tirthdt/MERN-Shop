import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { getUserByID, updateUserByID } from "../actions/authActions";
import FormContainer from "../components/FormContainer";
import { GET_USER_BY_ID_RESET } from "../actionTypes/authActions";

const AdminUserEditScreen = ({ match, history }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [isadmin, setisadmin] = useState(false);
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.userById);
  const { user, error, loading } = authSelector;

  const { success } = useSelector((state) => state.updateUserId);

  useEffect(() => {
    if (!user || user._id !== match.params.id) {
      dispatch(getUserByID(match.params.id));
    } else {
      setemail(user.email);
      setname(user.name);
      setisadmin(user.isAdmin);
    }
    if (success) {
      history.push("/users");
      dispatch({ type: GET_USER_BY_ID_RESET });
    }
  }, [dispatch, match, user, history, success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(email, name, isadmin);
    dispatch(
      updateUserByID({ id: match.params.id, email, name, isAdmin: isadmin })
    );
  };

  return (
    <FormContainer>
      {loading && <Loading />}
      <h1>Update</h1>
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
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

        <Form.Group className="mt-3">
          <Form.Check
            checked={isadmin}
            onChange={(e) => setisadmin(!isadmin)}
            type="checkbox"
            label="Admin"
          />
        </Form.Group>

        <Button className="mt-3 btn-block" type="submit" variant="dark">
          Update User
        </Button>
      </Form>
      <div className="text-center mt-2">
        <Link to="/users">Cancel</Link>
      </div>
    </FormContainer>
  );
};

export default AdminUserEditScreen;
