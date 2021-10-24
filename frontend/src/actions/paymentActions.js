import {
  PAYMENT_ORDER_CREATE_ERROR,
  PAYMENT_ORDER_CREATE_REQUEST,
  PAYMENT_ORDER_CREATE_SUCCESS,
  PAYMENT_VERIFY_ERROR,
  PAYMENT_VERIFY_REQUEST,
  PAYMENT_VERIFY_SUCCESS,
} from "../actionTypes/paymentActions";
import axios from "axios";

export const createPaymentOrder =
  (orderId, amount) => async (dispatch, getState) => {
    try {
      dispatch({ type: PAYMENT_ORDER_CREATE_REQUEST });
      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/payments`,
        { amount, orderId },
        config
      );
      dispatch({ type: PAYMENT_ORDER_CREATE_SUCCESS, payload: data.id });
    } catch (error) {
      dispatch({
        type: PAYMENT_ORDER_CREATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const verifyPayment = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_VERIFY_REQUEST,
    });
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/payments/validate",
      orderData,
      config
    );

    if (data.message === "success") {
      dispatch({ type: PAYMENT_VERIFY_SUCCESS });
    } else {
      dispatch({
        type: PAYMENT_VERIFY_ERROR,
        payload: "Payment not successful",
      });
    }
  } catch (error) {
    dispatch({
      type: PAYMENT_VERIFY_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
