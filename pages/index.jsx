import { Box, Button } from "@mui/material";

import { useSession } from "next-auth/react";

import { useGetProducts } from "../core/react-query/features/products";
import {
  useDeleteRecentlyViewedProducts,
  useGetRecentlyViewed,
} from "../core/react-query/features/recently-viewed-products";

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
  const { data: session, status } = useSession();

  const { data: products, isLoading } = useGetProducts();
  const { data: recentlyViewedProducts } = useGetRecentlyViewed({
    userId: session?.user.id,
  });
  const deleteRecentlyViewedProducts = useDeleteRecentlyViewedProducts();

  const recentlyViewedProductsIds = recentlyViewedProducts.map((productId) =>
    products.find((product) => product.id === productId)
  );

  if (isLoading) {
    return <Box sx={{ pt: "100px", textAlign: "center" }}>Loading</Box>;
  }
  return (
    <Box sx={{ pt: "80px" }}>
      <ProductList products={products} />
      {recentlyViewedProductsIds.length === 0 ? null : (
        <Box>
          Recently Viewed Products
          <Button
            onClick={() => {
              if (status === "authenticated") {
                deleteRecentlyViewedProducts.mutate({
                  userId: session.user.id,
                });
              } else {
                console.log("not logged in");
              }
            }}
          >
            Clear
          </Button>
          <ProductList
            style={recentlyViewedProductsStyle}
            products={recentlyViewedProductsIds}
          ></ProductList>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
