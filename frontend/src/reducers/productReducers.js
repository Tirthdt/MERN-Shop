import { PRODUCT_LIST_ERROR, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_FETCH_ERROR, PRODUCT_FETCH_SUCCESS, PRODUCT_FETCH_REQUEST } from '../actionTypes/productActions';

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_FETCH_REQUEST:
            return { loading: true }
        case PRODUCT_FETCH_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_FETCH_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}