import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { getAllOrders } from "../actions/orderActions";

const OrdersListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const orderState = useSelector((state) => state.allOrders);
  const { orders, loading, error } = orderState;

  console.log(orders);

  useEffect(() => {
    if (typeof userInfo === "undefined") {
      history.push("/");
      return;
    }
    if (userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.replace("/");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1 className="text-center">Users</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <LinkContainer to={`/orders/${order._id}`}>
                  <td>{order._id}</td>
                </LinkContainer>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td className="text-center">{order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  {order.isPaid ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersListScreen;
