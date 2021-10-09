import React, { useEffect } from "react";
import { Row, Col, Card, Image, ListGroup, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { getOrderDetail } from "../actions/orderActions";

//http://localhost:3000/orders/61619115c9b8591094ad58aa

const OrderScreen = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderDetail(id));
    }
  }, [order, id, dispatch]);

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <Alert variant="danger" className="text-center">
      {error}
    </Alert>
  ) : (
    <>
      <Row>
        <h1>Order {order._id}</h1>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Name:</strong> {order.user.name}
              <br />
              <strong> Email:</strong> {order.user.email}
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Alert variant="success">Delivered</Alert>
              ) : (
                <Alert variant="danger">Not Delivered</Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert variant="success">Paid on {order.paidAt}</Alert>
              ) : (
                <Alert variant="danger">Not Paid</Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Alert variant="warning">Order is empty</Alert>
              ) : (
                <>
                  {order.orderItems.map((orderItem) => {
                    return (
                      <Row className="mb-1" key={orderItem.product}>
                        <Col md={2}>
                          <Image
                            src={orderItem.image}
                            alt={orderItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>{orderItem.name}</Col>
                        <Col md={2}>${orderItem.price}</Col>
                        <Col md={1}>X</Col>
                        <Col md={2}>{orderItem.qty}</Col>
                        <Col md={2}>${orderItem.qty * orderItem.price}</Col>
                      </Row>
                    );
                  })}
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    $
                    {order.orderItems.reduce(
                      (acc, item) => acc + item.price * item.qty,
                      0
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
