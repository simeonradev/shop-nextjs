import {
  LOG_OUT,
  GET_USER,
  GET_USER_LOADED,
  GET_USER_ERROR,
  CREATE_USER,
  CREATE_USER_LOADED,
  CREATE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_LOADED,
  DELETE_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_LOADED,
  UPDATE_USER_ERROR,
  CLEAR_ERROR,
} from "./actions";

const initialState = { username: "", password: "", error: "" };

export const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return initialState;

    case GET_USER:
      return { ...state, ...action.data, error: "", loading: true };

    case GET_USER_LOADED:
      return { ...state, ...action.data, loading: false };

    case GET_USER_ERROR:
      return { ...state, ...action.data, loading: false };

    case CREATE_USER:
      return { ...state, ...action.data, error: "", loading: true };

    case CREATE_USER_LOADED:
      return { ...state, ...action.data, loading: false };

    case CREATE_USER_ERROR:
      return { ...state, ...action.data, loading: false };

    case DELETE_USER:
      return { ...state, ...action.data, error: "", loading: true };

    case DELETE_USER_LOADED:
      return initialState;

    case DELETE_USER_ERROR:
      return { ...state, ...action.data, loading: false };

    case UPDATE_USER:
      return { ...state, ...action.data, error: "", loading: true };

    case UPDATE_USER_LOADED:
      return { ...state, ...action.data, loading: false };

    case UPDATE_USER_ERROR:
      return { ...state, ...action.data, loading: false };

    case CLEAR_ERROR:
      return { ...state, error: "" };

    default:
      return state;
  }
};
