import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  authReducer,
  registerUserReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./reducers/authReducers";
import {
  orderCreateReducer,
  getOrderReducer,
  orderPayReducer,
  markOrderPaidReducer,
  myOrdersList,
} from "./reducers/orderReducer";
import {
  createPaymentReducer,
  verifyPaymentReducer,
} from "./reducers/paymentReducers";
import { userDeleteReducer, userListReducer } from "./reducers/userListReducer";

const reducer = combineReducers({
  productList: productListReducer,
  product: productReducer,
  cart: cartReducer,
  user: authReducer,
  registerUser: registerUserReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: getOrderReducer,
  orderPaid: markOrderPaidReducer,
  orderPay: orderPayReducer,
  paymentInfo: createPaymentReducer,
  paymentVerification: verifyPaymentReducer,
  myOrders: myOrdersList,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  user: { userInfo: userInfoFromStorage },
};
const middleWares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
