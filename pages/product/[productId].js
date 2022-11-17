import { Box, Button, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { ADD_PRODUCT_TO_CART } from "../../core/actions";

import { useRouter } from "next/router";

import ProductList from "../../components/ProductList";

const style = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  height: "300px",
  overflowX: "scroll",
};

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { productId } = router.query;

  const productDataArray = useSelector((state) => {
    return state.productData;
  });

  const selectedProduct = productDataArray.find((product) => {
    return product.id === productId;
  });

  const handleAddToCart = () => {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      data: props,
    });
  };

  const test = (a) => {
    return productDataArray.filter(
      (productData) =>
        productData.rating === selectedProduct.rating - a ||
        productData.rating === selectedProduct.rating + a
    );
  };

  if (productDataArray.length === 0) return <Box>Loading</Box>;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "98vh",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h3" sx={{ pt: "50px", textAlign: "center" }}>
        {selectedProduct.name}
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
          src={selectedProduct.img}
          sx={{
            maxHeight: "300px",
            borderRadius: "15px",
            boxShadow: "0 0 10px #000000",
          }}
        ></Box>
        <Box sx={{ minWidth: "120px" }}>
          <Typography>Price: {selectedProduct.price}</Typography>
          <Typography>Category: {selectedProduct.category}</Typography>
          <Typography>Location: {selectedProduct.location}</Typography>
          <Typography>Rating: {selectedProduct.rating}</Typography>
          <Typography>
            InStock: {JSON.stringify(selectedProduct.inStock)}
          </Typography>
          <Button onClick={() => handleAddToCart()}>Add to Cart</Button>
        </Box>
      </Box>
      <Box>
        Similar Products
        <ProductList style={style} products={test(1)}></ProductList>
      </Box>
    </Box>
  );
};
export default ProductPage;
