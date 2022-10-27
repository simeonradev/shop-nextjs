import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);

  const hasFeaturedProduct = useSelector((state) => {
    return state.productCartReducer.hasFeatured;
  });

  const individualProductAdditionsArray = useSelector((state) => {
    return state.productCartReducer.individualProductAdditionsArray;
  });

  const ImportanceOfCart = () => {
    const value = individualProductAdditionsArray.reduce((prev, curr) => {
      return prev.addToCartCounter > curr.addToCartCounter ? prev : curr;
    }, {}).addToCartCounter;

    if (value >= 7) {
      return "is Ultra Special";
    } else if (value >= 5) {
      return "is Super Special";
    } else if (value >= 3) {
      return "is Special";
    }
  };

  return (
    <Box sx={{ paddingTop: "60px" }}>
      <Typography variant="h4">
        Your Cart <ImportanceOfCart />
      </Typography>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <Typography variant="h6">
        Total: ${calculateTotal(cartItems).toFixed(2)}
      </Typography>

      {hasFeaturedProduct ? (
        <Box>
          <Typography variant="h6">
            20% Discount: ${(calculateTotal(cartItems) * 0.2).toFixed(2)}
          </Typography>
          <Typography variant="h6">
            New Price: ${(calculateTotal(cartItems) * 0.8).toFixed(2)}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default Cart;
