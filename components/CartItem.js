import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CartItemMain = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid rgb(0, 0, 0);
  padding: 10px;
`;
const CartItemBody = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CartItem = ({ item, addToCart, removeFromCart }) => {
  return (
    <CartItemMain>
      <Box minWidth="200px" sx={{ display: "grid" }}>
        <Typography variant="h6">{item.name}</Typography>
        <CartItemBody>
          <Typography>
            Single price: ${item.price.toFixed(2)}
            <br></br>
            Total price: ${(item.amount * item.price).toFixed(2)}
          </Typography>
        </CartItemBody>
        <CartItemBody>
          <Button
            size="large"
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            <Typography> - </Typography>
          </Button>
          <Typography> {item.amount} </Typography>
          <Button
            size="large"
            variant="contained"
            onClick={() => addToCart(item)}
          >
            <Typography> + </Typography>
          </Button>
        </CartItemBody>
      </Box>
      <Box>
        <Box
          component="img"
          style={{ maxWidth: "150px", objectFit: "cover" }}
          src={item.img}
          alt={item.title}
        />
      </Box>
    </CartItemMain>
  );
};

export default CartItem;
