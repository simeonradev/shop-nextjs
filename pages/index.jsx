import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import { GET_PRODUCTS } from "../core/actions";

import ProductList from "../components/ProductList";

const recentlyViewedProductsStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  height: "300px",
  overflowX: "scroll",
};
const HomePage = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => {
    return state.allProducts;
  });

  const recentlyViewedArray = useSelector((state) => {
    return state.recentlyViewed;
  });

  const recentlyViewedProducts = recentlyViewedArray.map((productId) =>
    allProducts.find((product) => product.id === productId)
  );

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS,
    });
  }, []);

  return (
    <Box sx={{ pt: "80px" }}>
      <ProductList products={allProducts} />
      {recentlyViewedProducts.length === 0 ? null : (
        <Box>
          Recently Viewed Products
          <ProductList
            style={recentlyViewedProductsStyle}
            products={recentlyViewedProducts}
          ></ProductList>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
