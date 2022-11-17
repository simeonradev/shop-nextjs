import { GET_PRODUCT_DATA_ARRAY } from "./actions";

const initialState = [];

export const productData = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_DATA_ARRAY:
      return action.data;

    default:
      return state;
  }
};
