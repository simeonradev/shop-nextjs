import { combineReducers } from "redux";

import { productCart } from "./productCart";
import { productData } from "./productData";
import { selectedCategory } from "./selectedCategory";
import { searchTerm } from "./searchTerm";
import { currentUser } from "./currentUser";
import { recentlyViewed } from "./recentlyViewed";
import { modal } from "./modal";

// COMBINED REDUCERS
const reducers = {
  productData,
  productCart,
  currentUser,
  recentlyViewed,
  modal,
  searchTerm,
  selectedCategory,
};

export default combineReducers(reducers);
