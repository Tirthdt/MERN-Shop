import {
  PAYMENT_ORDER_CREATE_ERROR,
  PAYMENT_ORDER_CREATE_REQUEST,
  PAYMENT_ORDER_CREATE_RESET,
  PAYMENT_ORDER_CREATE_SUCCESS,
  PAYMENT_VERIFY_ERROR,
  PAYMENT_VERIFY_REQUEST,
  PAYMENT_VERIFY_SUCCESS,
} from "../actionTypes/paymentActions";

export const createPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_ORDER_CREATE_REQUEST:
      return { loading: true };
    case PAYMENT_ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order_id: action.payload };
    case PAYMENT_ORDER_CREATE_ERROR:
      return { loading: false, error: action.payload };
    case PAYMENT_ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const verifyPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_VERIFY_REQUEST:
      return { loading: true };
    case PAYMENT_VERIFY_SUCCESS:
      return { loading: false, verified: true };
    case PAYMENT_VERIFY_ERROR:
      return { loading: false, verified: false, error: action.payload };
    default:
      return state;
  }
};
