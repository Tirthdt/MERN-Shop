import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../components/CheckOutSteps";
import { createOrder } from "../actions/orderActions";

const Placeorder = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //calculate items Price
  cart.itemPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  //calculate shipping price
  cart.shippingPrice = cart.itemPrice > 100 ? 0 : 30;

  //calculate tax price
  cart.taxPrice = Number((0.15 * cart.itemPrice).toFixed(2));

  //total price
  cart.totalPrice = (
    Number(cart.itemPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const { order, success, error } = useSelector((state) => state.orderCreate);

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
  }, [success, history, order]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        taxPrice: cart.taxPrice,
        itemsPrice: cart.itemPrice,
      })
    );
  };

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Alert variant="warning">Your Cart is empty</Alert>
              ) : (
                <>
                  <Row className="mb-1">
                    <Col md={2}></Col>
                    <Col md={3}>
                      <h2>Product</h2>
                    </Col>
                    <Col md={2}>
                      <h2>Price</h2>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={2}>
                      <h2>Qty</h2>
                    </Col>
                    <Col md={2}>
                      <h2>Total</h2>
                    </Col>
                  </Row>
                  {cart.cartItems.map((cartItem) => {
                    return (
                      <Row className="mb-1" key={cartItem.product}>
                        <Col md={2}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>{cartItem.name}</Col>
                        <Col md={2}>Rs.{cartItem.price}</Col>
                        <Col md={1}>X</Col>
                        <Col md={2}>{cartItem.qty}</Col>
                        <Col md={2}>{cartItem.qty * cartItem.price}</Col>
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
                  <Col>Rs.{cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs.{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs.{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs.{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  variant="dark"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Placeorder;
