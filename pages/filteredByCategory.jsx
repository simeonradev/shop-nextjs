import { useEffect, useState } from "react";

import SideNavBar from "../components/SideNavBar";

import Box from "@mui/material/Box";

import { useSelector, useDispatch } from "react-redux";
import ProductList from "../components/ProductList";

import { GET_PRODUCT_DATA_ARRAY } from "../core/actions";
import productDataArray from "../components/productDataArray";

const FilteredByCategory = () => {
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(filteredByCategory);
  const dispatch = useDispatch();

  // const productDataArray = useSelector((state) => {
  //   return state.productData;
  // });

  const selectedCategory = useSelector((state) => {
    return state.selectedCategory;
  });

  const onFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_DATA_ARRAY,
      data: productDataArray,
    });
  }, []);

  useEffect(() => {
    setFilteredByCategory(
      productDataArray.filter(
        (productData) => productData.category === selectedCategory
      )
    );
  }, [selectedCategory, productDataArray]);

  return (
    <Box sx={{ display: "flex", pt: "50px" }}>
      <SideNavBar data={filteredByCategory} onFilter={onFilter}></SideNavBar>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <ProductList products={filteredProducts} />
      </Box>
    </Box>
  );
};

export default FilteredByCategory;
