import React, { useCallback, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Alert,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import {
  getOrderDetail,
  markOrderPaid,
  markOrderDelivered,
} from "../actions/orderActions";
import { createPaymentOrder, verifyPayment } from "../actions/paymentActions";
import { MARK_ORDER_DELIVERED_RESET } from "../actionTypes/orderActions";

const OrderScreen = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const paymentCreationDetails = useSelector((state) => state.paymentInfo);
  const { userInfo } = useSelector((state) => state.user);
  const { success: orderDeliveredSuccess } = useSelector(
    (state) => state.orderDelivered
  );
  const { order, loading, error } = orderDetails;
  const { success: paymentCreationSuccess, order_id } = paymentCreationDetails;
  const { verified } = useSelector((state) => state.paymentVerification);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const displayRazorPay = useCallback(async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.log("RazorPay sdk failed");
      return;
    }

    const options = {
      key: "rzp_test_4FjJowHKlQAZkZ",
      amount: Math.round(order.totalPrice),
      currency: "INR",
      name: "SHOPIFY",
      description: `ORDER RECEIPT ${id}`,
      order_id,
      handler: async function (response) {
        console.log(response);
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        dispatch(verifyPayment(data));
      },
      prefill: {
        name: order.user.name,
        email: order.user.email,
      },
      theme: {
        color: "#111",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }, [id, order, order_id, dispatch]);

  useEffect(() => {
    if (typeof userInfo === "undefined") {
      history.push("/login");
      return;
    }
    if (!order || order?._id !== id) {
      dispatch(getOrderDetail(id));
    }
    if (orderDeliveredSuccess) {
      dispatch(getOrderDetail(id));
      dispatch({ type: MARK_ORDER_DELIVERED_RESET });
    }
    if (verified && !order.isPaid) {
      dispatch(markOrderPaid(order));
    }
    if (paymentCreationSuccess && !verified) {
      displayRazorPay();
    }
  }, [
    order,
    id,
    dispatch,
    paymentCreationSuccess,
    displayRazorPay,
    verified,
    orderDeliveredSuccess,
    history,
    userInfo,
  ]);

  const makePayment = () => {
    dispatch(createPaymentOrder(id, order.totalPrice));
  };

  const markOrderDeliverd = () => {
    console.log("Mark order delivered");
    dispatch(markOrderDelivered(id));
  };

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
                <Alert variant="success">Paid on {order.payedAt}</Alert>
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
                        <Col md={2}>Rs.{orderItem.price}</Col>
                        <Col md={1}>X</Col>
                        <Col md={2}>{orderItem.qty}</Col>
                        <Col md={2}>Rs.{orderItem.qty * orderItem.price}</Col>
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
                    Rs.
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
                  <Col>Rs.{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs.{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs.{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <Button
                    variant="dark"
                    onClick={makePayment}
                    className="btn-block"
                  >
                    Make Payment
                  </Button>
                </ListGroup.Item>
              )}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    variant="success"
                    onClick={markOrderDeliverd}
                    className="w-100"
                  >
                    Mark Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
