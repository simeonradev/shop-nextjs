import {
  UPDATE_PRODUCTS_LOADED,
  GET_PRODUCTS_LOADED,
  DELETE_PRODUCT_LOADED,
} from "./actions";

const initialState = [];

export const allProducts = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS_LOADED:
      // eslint-disable-next-line no-case-declarations
      const doesProductExist = state.find(
        (product) => product.id === action.data.id
      );

      return doesProductExist
        ? state.map((product) =>
            product.id === action.data.id ? action.data : product
          )
        : [...state, action.data];

    case GET_PRODUCTS_LOADED:
      return action.data ? action.data : state;

    case DELETE_PRODUCT_LOADED:
      return state.filter((item) => {
        return item.id !== action.data;
      });

    default:
      return state;
  }
};
