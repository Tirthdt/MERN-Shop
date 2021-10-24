import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Alert, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import { getUserDetails, updateUserDetails } from "../actions/authActions";
import { getMyOrders } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setname] = useState("");
  const [editable, seteditable] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, error, loading } = userDetails;

  const authSelector = useSelector((state) => state.user);
  const { userInfo } = authSelector;

  const userUpdateProfileSelector = useSelector(
    (state) => state.userUpdateProfile
  );
  const { success } = userUpdateProfileSelector;

  const myOrdersSelector = useSelector((state) => state.myOrders);
  const {
    loading: ordersLoading,
    error: ordersError,
    orders,
  } = myOrdersSelector;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrders());
      } else {
        setname(user.name);
        setemail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

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

    dispatch(updateUserDetails({ name, email, password }));
    setpassword("");
    setmessage("");
    setconfirmpassword("");
    seteditable(false);
  };

  return (
    <Row>
      <Col md={3}>
        <h1>Profile</h1>
        {(error || message) && (
          <Alert variant="danger" className="text-center">
            {message ? message : error}
          </Alert>
        )}
        {success && <Alert variant="warning">Profile Updated</Alert>}
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              disabled={!editable}
              onChange={(e) => setname(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              disabled={!editable}
              onChange={(e) => setemail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              disabled={!editable}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              disabled={!editable}
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {editable ? (
            <>
              <Button className="mt-3 btn-block" type="submit" variant="dark">
                {loading ? <Loading></Loading> : "Update"}
              </Button>
              <Button
                variant="danger"
                type="button"
                className="mt-3 btn-block"
                onClick={(e) => {
                  e.preventDefault();
                  seteditable(false);
                }}
              >
                Cancel Edit
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="mt-3 btn-block"
              onClick={(e) => {
                e.preventDefault();
                seteditable(true);
              }}
            >
              Edit
            </Button>
          )}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loading />
        ) : ordersError ? (
          <Alert variant="danger">{ordersError}</Alert>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm text-center"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>Rs.{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.payedAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button>Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
