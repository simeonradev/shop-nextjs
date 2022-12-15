import { Box, Button, DialogContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ImgBox = styled(Box)`
  border: 1px solid #00000080;
  border-radius: 50px;
  padding: 3px;
  width: 75px;
  box-shadow: 0 0 10px #000000;
`;

export const ProductPreviewModal = (props) => (
  <DialogContent>
    <Box sx={{ textAlign: "center" }}>
      {props.img === undefined ? (
        <ImgBox component="img" alt={props.id} src="/images/didi.jpg" />
      ) : (
        <ImgBox component="img" alt={props.id} src={props.img} />
      )}
    </Box>
    <Typography variant="h6" sx={{ textAlign: "center" }}>
      {props.name}
    </Typography>
    <Typography>Price: {props.price}</Typography>
    <Typography>Category: {props.category}</Typography>
    <Typography>Location: {props.location}</Typography>
    <Typography>Rating: {props.rating}</Typography>
    <Typography>InStock: {JSON.stringify(props.inStock)}</Typography>
    <Button onClick={props.hideModal}>close</Button>
  </DialogContent>
);
