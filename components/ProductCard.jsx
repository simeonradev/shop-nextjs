import { Box, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { useContext } from "react";
import { ColorModeContext } from "../pages/_app";
import Link from "./Link";

const ImgBox = styled(Box)`
  border: 1px solid #00000080;
  border-radius: 50px;
  padding: 3px;
  width: 75px;
  box-shadow: 0 0 10px #000000;
`;

const ProductCardBox = styled(Box, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "changeColor",
})(({ changeColor }) => ({
  width: "200px",
  marginRight: "10px",
  marginLeft: "10px",
  backgroundColor: changeColor === "light" ? "#838383d5" : "#cf6f00",
  borderRadius: "5px",
  border: "2px solid #00000080",
  boxShadow: "0 0 7px #00000080",
}));

const ProductCard = (props) => {
  const colorMode = useContext(ColorModeContext);

  return (
    <Box>
      <Link href={`/product/${props.id}`}>
        <ProductCardBox
          changeColor={colorMode.mode}
          onClick={props.onClick}
          sx={{ cursor: "default" }}
        >
          <Box sx={{ textAlign: "center" }}>
            {props.img === undefined ? (
              <ImgBox component="img" alt={props.id} src="/images/didi.jpg" />
            ) : (
              <ImgBox component="img" alt={props.id} src={props.img} />
            )}
          </Box>
          <Tooltip title={props.name}>
            <Typography noWrap variant="h6" sx={{ textAlign: "center" }}>
              {props.name}
            </Typography>
          </Tooltip>

          <Typography>Price: {props.price}</Typography>
          <Typography>Category: {props.category}</Typography>
          <Typography>Location: {props.location}</Typography>
          <Typography>Rating: {props.rating}</Typography>
          <Typography>InStock: {JSON.stringify(props.inStock)}</Typography>
        </ProductCardBox>
      </Link>
      {props.footerActions}
    </Box>
  );
};

export default ProductCard;
