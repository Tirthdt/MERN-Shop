import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  createReviewReducer,
  getTopProductsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  authReducer,
  registerUserReducer,
  userDetailsReducer,
  userUpdateReducer,
  resetPasswordReducer,
} from "./reducers/authReducers";
import {
  orderCreateReducer,
  getOrderReducer,
  orderPayReducer,
  markOrderPaidReducer,
  myOrdersList,
  getAllOrders,
  markOrderDeliveredReducer,
} from "./reducers/orderReducer";
import {
  createPaymentReducer,
  verifyPaymentReducer,
} from "./reducers/paymentReducers";
import {
  userDeleteReducer,
  userListReducer,
  getUserByIdReducer,
  updateUserByIdReducer,
} from "./reducers/userListReducer";

const reducer = combineReducers({
  productList: productListReducer,
  product: productReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReview: createReviewReducer,
  topProducts: getTopProductsReducer,
  cart: cartReducer,
  user: authReducer,
  registerUser: registerUserReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateReducer,
  resetPassword: resetPasswordReducer,
  orderCreate: orderCreateReducer,
  orderDetails: getOrderReducer,
  orderPaid: markOrderPaidReducer,
  orderPay: orderPayReducer,
  orderDelivered: markOrderDeliveredReducer,
  allOrders: getAllOrders,
  paymentInfo: createPaymentReducer,
  paymentVerification: verifyPaymentReducer,
  myOrders: myOrdersList,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userById: getUserByIdReducer,
  updateUserId: updateUserByIdReducer,
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
