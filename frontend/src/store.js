import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({ productList: productListReducer, product: productReducer, cart: cartReducer });

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = { cart: { cartItems: cartItemsFromStorage } };
const middleWares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWares)))

export default store;

