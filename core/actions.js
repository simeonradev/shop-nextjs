export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const GET_PRODUCT_DATA_ARRAY = "GET_PRODUCT_DATA_ARRAY";
export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const SEARCH_TERM = "SEARCH_TERM";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const RECENTLY_VIEWED = "RECENTLY_VIEWED";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const MODAL = "MODAL";

export const counterActionTypes = {
  INCREMENT: "INCREMENT",
};

export const incrementCounter = () => {
  return { type: counterActionTypes.INCREMENT };
};
