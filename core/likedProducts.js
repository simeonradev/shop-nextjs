import {
  UPDATE_LIKED_PRODUCTS_LOADED,
  GET_LIKED_PRODUCTS_LOADED,
  DELETE_LIKED_PRODUCT_LOADED,
} from "./actions";

const initialState = [];

export const likedProducts = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIKED_PRODUCTS_LOADED:
      // eslint-disable-next-line no-case-declarations
      const isProductLiked = state.find((itemId) => itemId === action.data);
      console.log(isProductLiked);
      return isProductLiked ? state : [...state, action.data];

    case GET_LIKED_PRODUCTS_LOADED:
      return action.data ? action.data : state;

    case DELETE_LIKED_PRODUCT_LOADED:
      return state.filter((item) => item !== action.data);

    default:
      return state;
  }
};
