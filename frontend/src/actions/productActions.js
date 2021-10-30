import {
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_FETCH_ERROR,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  GET_TOP_PRODUCT_REQUEST,
  GET_TOP_PRODUCT_SUCCESS,
  GET_TOP_PRODUCT_FAIL,
} from "../actionTypes/productActions";
import axios from "axios";

export const listProducts =
  (keyword, pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOP_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/products/top`);
    dispatch({ type: GET_TOP_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TOP_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_FETCH_REQUEST });
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_FETCH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const { data } = await axios.post(`/api/products/create`, {}, config);

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createReview = (id, review) => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const { data } = await axios.post(
      `/api/products/${id}/reviews`,
      review,
      config
    );

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProductByID = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/products/delete/${productId}`,
      config
    );

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
