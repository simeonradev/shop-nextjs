// import { combineReducers } from "redux";

import { combineReducers } from "@reduxjs/toolkit";

import { productCart } from "./productCart";
import { productData } from "./productData";
import { selectedCategory } from "./selectedCategory";
import { searchTerm } from "./searchTerm";
import { currentUser } from "./currentUser";
import { recentlyViewed } from "./recentlyViewed";
import { modal } from "./modal";
import { counter } from "./counter";

// COMBINED REDUCERS
const combinedReducers = {
  productData,
  productCart,
  currentUser,
  recentlyViewed,
  modal,
  searchTerm,
  selectedCategory,
  counter,
};

export default combineReducers(combinedReducers);
