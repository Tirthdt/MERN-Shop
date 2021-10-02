import { PRODUCT_LIST_ERROR, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_FETCH_ERROR, PRODUCT_FETCH_SUCCESS, PRODUCT_FETCH_REQUEST } from '../actionTypes/productActions';
import axios from "axios";


export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("/api/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: PRODUCT_LIST_ERROR, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}

export const listProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_FETCH_REQUEST });
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_FETCH_ERROR, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}