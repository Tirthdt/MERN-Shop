import {
  GET_MY_ORDERS_ERROR,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_RESET,
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  MARK_ORDER_PAID_ERROR,
  MARK_ORDER_PAID_REQUEST,
  MARK_ORDER_PAID_SUCCESS,
  ORDER_PAY_ERROR,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  PLACE_ORDER_ERROR,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_ERROR,
  GET_ALL_ORDERS_RESET,
  MARK_ORDER_DELIVERED_REQUEST,
  MARK_ORDER_DELIVERED_SUCCESS,
  MARK_ORDER_DELIVERED_ERROR,
  MARK_ORDER_DELIVERED_RESET,
} from "../actionTypes/orderActions";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return { loading: true };
    case PLACE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case PLACE_ORDER_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getOrderReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case GET_ORDER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_ERROR:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const markOrderPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_ORDER_PAID_REQUEST:
      return { loading: true };
    case MARK_ORDER_PAID_SUCCESS:
      return { loading: false, success: true };
    case MARK_ORDER_PAID_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myOrdersList = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return { loading: true };
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_MY_ORDERS_ERROR:
      return { loading: false, error: action.payload };
    case GET_MY_ORDERS_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const getAllOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { loading: true };
    case GET_ALL_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_ALL_ORDERS_ERROR:
      return { loading: false, error: action.payload };
    case GET_ALL_ORDERS_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const markOrderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case MARK_ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case MARK_ORDER_DELIVERED_ERROR:
      return { loading: false, error: action.payload };
    case MARK_ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};
