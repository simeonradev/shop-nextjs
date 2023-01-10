import { ADD_TO_LIKED, REMOVE_FROM_LIKED } from "./actions";

const initialState = [];

export const likedProducts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_LIKED:
      const isProductLiked = state.find((itemId) => itemId === action.data);

      return isProductLiked ? state : [...state, action.data];

    case REMOVE_FROM_LIKED:
      return state.filter((item) => item !== action.data);

    default:
      return state;
  }
};
