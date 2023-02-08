import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";

import { SELECTED_CATEGORY, GET_PRODUCT_DATA_ARRAY } from "../core/actions";

import ProductList from "../components/ProductList";
import productDataArray from "../components/productDataArray";
import { useRouter } from "next/router";
import Link from "../components/Link";

const style = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  height: "300px",
  overflowX: "scroll",
};
const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const productDataArrayFromReducer = useSelector((state) => {
    return state.productData;
  });

  const recentlyViewedArray = useSelector((state) => {
    return state.recentlyViewed;
  });

  const recentlyViewedProducts = recentlyViewedArray.map((productId) =>
    productDataArrayFromReducer.find((product) => product.id === productId)
  );

  useEffect(() => {
    dispatch({
      type: GET_PRODUCT_DATA_ARRAY,
      data: productDataArray,
    });
  }, [dispatch]);

  return (
    <Box sx={{ pt: "60px" }}>
      <br />
      <Box>
        Categories:
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "car" });
              // router.push("/filteredByCategory");
            }}
            color="secondary"
          >
            Car
          </Button>
        </Link>
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "clothes" });
            }}
            color="secondary"
          >
            Clothes
          </Button>
        </Link>
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "electronics" });
            }}
            color="secondary"
          >
            Electronics
          </Button>
        </Link>
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "food" });
            }}
            color="secondary"
          >
            Food
          </Button>
        </Link>
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "garden" });
            }}
            color="secondary"
          >
            Garden
          </Button>
        </Link>
      </Box>
      <br />
      <ProductList
        products={productDataArray.filter(
          (productData) => productData.featured === true
        )}
      />
      {recentlyViewedProducts.length === 0 ? null : (
        <Box>
          Recently Viewed Products
          <ProductList
            style={style}
            products={recentlyViewedProducts}
          ></ProductList>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
