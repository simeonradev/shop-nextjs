import { SELECTED_CATEGORY } from "./actions";

const initialState = "";

export const selectedCategory = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_CATEGORY:
      return action.data;

    default:
      return state;
  }
};
