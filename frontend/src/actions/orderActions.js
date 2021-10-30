import axios from "axios";
import { EMPTY_CART } from "../actionTypes/cartActions";
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  MARK_ORDER_PAID_REQUEST,
  MARK_ORDER_PAID_SUCCESS,
  MARK_ORDER_PAID_ERROR,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_ERROR,
  GET_ALL_ORDERS_ERROR,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  MARK_ORDER_DELIVERED_ERROR,
  MARK_ORDER_DELIVERED_SUCCESS,
  MARK_ORDER_DELIVERED_REQUEST,
} from "../actionTypes/orderActions";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, { ...order }, config);
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
    dispatch({ type: EMPTY_CART });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_ORDERS_REQUEST });
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myOrders`, config);
    dispatch({
      type: GET_MY_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        { id: order._id, ...paymentResult },
        config
      );
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
      dispatch({
        type: ORDER_PAY_RESET,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDER_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const markOrderPaid = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_ORDER_PAID_REQUEST });
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderData.id}/pay`,
      orderData,
      config
    );
    dispatch({ type: MARK_ORDER_PAID_SUCCESS });
    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MARK_ORDER_PAID_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const markOrderDelivered = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_ORDER_DELIVERED_REQUEST });
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/delivered`,
      {},
      config
    );

    dispatch({ type: MARK_ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MARK_ORDER_DELIVERED_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    const { data } = await axios.get("/api/orders", config);
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
