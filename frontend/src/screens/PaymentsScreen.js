import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";

const PaymentsScreen = ({ history }) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setpaymentMethod] = useState("Online");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeOrder");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Online"
              id="Online"
              name="paymentMethod"
              value="Online"
              checked
              onChange={() => setpaymentMethod("Online")}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              id="COD"
              name="paymentMethod"
              value="Cash on Delivery"
              onChange={() => setpaymentMethod("Cash on Delivery")}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className="mt-3 btn-block" type="submit" variant="dark">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentsScreen;
