import { LOG_IN, LOG_OUT } from "./actions";

const initialState = { loggedInUser: {}, isLoggedIn: false };

export const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        loggedInUser: action.data,
        isLoggedIn: true,
      };
    case LOG_OUT:
      return {
        loggedInUser: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
