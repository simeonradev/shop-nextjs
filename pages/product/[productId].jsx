import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ProductList from "../../components/ProductList";
import { useGetProducts } from "../../core/react-query/features/products";

import {
  useDeleteLikedProduct,
  useUpdateLikedProduct,
  useGetLikedProducts,
} from "../../core/react-query/features/liked-products";

import { useUpdateShoppingCart } from "../../core/react-query/features/shopping-cart";

const similarProductsStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  height: "310px",
  overflowX: "scroll",
};

const ProductPage = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { data: products, isLoading } = useGetProducts();

  const { data: likedProducts } = useGetLikedProducts({
    userId: session.user.id,
  });
  const updateLikedProduct = useUpdateLikedProduct();
  const deleteLikedProduct = useDeleteLikedProduct();

  const { productId } = router.query;

  const updateShoppingCart = useUpdateShoppingCart();

  const selectedProduct = products.find((product) => {
    return product.id === productId;
  });
  const handleAddToCart = () => {
    if (status === "authenticated") {
      updateShoppingCart.mutate({
        ...selectedProduct,
        userId: session.user.id,
      });
    } else {
      console.log("not logged in");
    }
  };

  const similarProducts = (a) => {
    return products.filter(
      (productData) =>
        productData.rating === selectedProduct?.rating - a ||
        productData.rating === selectedProduct?.rating + a
    );
  };

  if (isLoading) {
    return <Box sx={{ pt: "60px", textAlign: "center" }}>Loading</Box>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "98vh",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h3" sx={{ pt: "60px", textAlign: "center" }}>
        {selectedProduct?.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={selectedProduct?.img}
          sx={{
            maxHeight: "300px",
            borderRadius: "15px",
            boxShadow: "0 0 10px #000000",
          }}
        ></Box>
        <Box sx={{ minWidth: "120px" }}>
          <Typography>Price: {selectedProduct?.price}</Typography>
          <Typography>Category: {selectedProduct?.category}</Typography>
          <Typography>Location: {selectedProduct?.location}</Typography>
          <Typography>Rating: {selectedProduct?.rating}</Typography>
          <Typography>
            InStock: {JSON.stringify(selectedProduct?.inStock)}
          </Typography>
          <Button onClick={() => handleAddToCart()} color="secondary">
            Add to Cart
          </Button>
          <br></br>

          {likedProducts.find(
            (productId) => productId === selectedProduct?.id
          ) ? (
            <Button
              onClick={() => {
                deleteLikedProduct.mutate({
                  id: selectedProduct.id,
                  userId: session.user.id,
                });
              }}
              color={"secondary"}
            >
              Liked
              <FavoriteIcon />
            </Button>
          ) : (
            <Button
              onClick={() => {
                updateLikedProduct.mutate({
                  id: selectedProduct.id,
                  userId: session.user.id,
                });
              }}
              color={"secondary"}
            >
              Like
              <FavoriteBorderIcon />
            </Button>
          )}
        </Box>
      </Box>
      <Box>
        Similar Products
        <ProductList
          style={similarProductsStyle}
          products={similarProducts(1)}
        ></ProductList>
      </Box>
    </Box>
  );
};
export default ProductPage;
