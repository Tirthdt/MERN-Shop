import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_REGISTER_RESET,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_RESET,
} from "../actionTypes/authActions";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      localStorage.setItem("userInfo", "");
      return {};
    default:
      return state;
  }
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, userDetails: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
        userInfo: action.payload,
        loading: false,
      };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { ...state, success: false };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
