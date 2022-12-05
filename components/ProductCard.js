import { Box, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import Link from "./Link";

const ImgBox = styled(Box)`
  border: 1px solid #00000080;
  border-radius: 50px;
  padding: 3px;
  width: 75px;
  box-shadow: 0 0 10px #000000;
`;

const ProductCardBox = styled(Box)`
  width: 200px;
  margin-right: 10px;
  margin-left: 10px;
  background-color: #838383d5;
  border-radius: 5px;
  border: 2px solid #00000080;
  box-shadow: 0 0 7px #00000080;
`;

const ProductCard = (props) => {
  return (
    <Box>
      <Link href={`/product/${props.id}`}>
        <ProductCardBox onClick={props.onClick} sx={{ cursor: "default" }}>
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
