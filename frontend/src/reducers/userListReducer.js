import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  UPDATE_USER_BY_ID_REQUEST,
  UPDATE_USER_BY_ID_SUCCESS,
  UPDATE_USER_BY_ID_FAIL,
  UPDATE_USER_BY_ID_RESET,
  GET_USER_BY_ID_RESET,
} from "../actionTypes/authActions";

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case USER_DELETE_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case USER_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserByIdReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case GET_USER_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_USER_BY_ID_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case GET_USER_BY_ID_FAIL:
      return { ...state, error: action.payload, loading: false };
    case GET_USER_BY_ID_RESET:
      return { user: null };
    default:
      return state;
  }
};

export const updateUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_BY_ID_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_BY_ID_SUCCESS:
      return { ...state, success: true, loading: false };
    case UPDATE_USER_BY_ID_FAIL:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_USER_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};
