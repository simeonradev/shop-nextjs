import { GET_PRODUCT_DATA_ARRAY } from "./actions";

const initialState = { productDataArray: [] };

export const productDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_DATA_ARRAY:
      return { productDataArray: action.data };

    default:
      return state;
  }
};
