import { LOG_IN, LOG_OUT } from "./actions";

const initialState = { currentUser: {}, logedIn: false };

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        currentUser: action.data,
        logedIn: true,
      };
    case LOG_OUT:
      return {
        currentUser: {},
        logedIn: false,
      };
    default:
      return state;
  }
};
