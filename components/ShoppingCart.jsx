import { Box, Typography } from "@mui/material";
import ShoppingCartItem from "./ShoppingCartItem";

const ShoppingCart = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  return (
    <Box sx={{ paddingTop: "60px" }}>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <ShoppingCartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <Typography variant="h6">
        Total: ${calculateTotal(cartItems).toFixed(2)}
      </Typography>
    </Box>
  );
};

export default ShoppingCart;
