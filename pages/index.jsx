import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";

import {
  SELECTED_CATEGORY,
  GET_PRODUCT_DATA_ARRAY,
  INCREMENT,
  DECREMENT,
} from "../core/actions";

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

  ///////////////////////// Use backend data ///////////////////////////////
  // useEffect(() => {
  //   async function getResponse() {
  //     try {
  //       const response = await fetch("http://localhost:3001/products", {
  //         method: "GET",
  //       });

  //       const actualData = await response.json();

  //       dispatch({
  //         type: GET_PRODUCT_DATA_ARRAY,
  //         data: actualData,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getResponse();
  // }, []);

  // const globalModal = useSelector((state) => {
  //   return state.modal.modal;
  // });

  // useEffect(() => {
  //   dispatch({
  //     type: GET_PRODUCT_DATA_ARRAY,
  //     data: productDataArray,
  //   });
  // }, [dispatch]);

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

  const count = useSelector((state) => {
    return state.counter.count;
  });

  return (
    <Box sx={{ pt: "60px" }}>
      {/* {count}
      <Box>
        <Button
          onClick={() => {
            dispatch({ type: INCREMENT });
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: DECREMENT });
          }}
        >
          -
        </Button>
      </Box> */}

      <br />
      <Box>
        Categories:
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "car" });
              // router.push("/filteredByCategory");
            }}
          >
            Car
          </Button>
        </Link>
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "clothes" });
            }}
          >
            Clothes
          </Button>
        </Link>
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "electronics" });
            }}
          >
            Electronics
          </Button>
        </Link>
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "food" });
            }}
          >
            Food
          </Button>
        </Link>
        <Link href="/filteredByCategory">
          <Button
            onClick={() => {
              dispatch({ type: SELECTED_CATEGORY, data: "garden" });
            }}
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
