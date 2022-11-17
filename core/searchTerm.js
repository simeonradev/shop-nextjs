import { SEARCH_TERM } from "./actions";

const initialState = "";

export const searchTerm = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TERM:
      return action.data;

    default:
      return state;
  }
};
