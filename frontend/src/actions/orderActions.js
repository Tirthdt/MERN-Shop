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