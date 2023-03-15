import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../core/actions";

export const UpdateProductModal = (props) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const productInfo = props.productDetails;
  const updateProduct = (productDetails) => {
    const updatedProduct = {
      ...productDetails,
      createdBy: productInfo.createdBy,
      id: productInfo.id,
    };

    dispatch({
      type: UPDATE_PRODUCTS,
      data: updatedProduct,
    });
  };

  return (
    <Grid sx={{ display: "flex", p: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box align="center">
          <Typography variant="h5">Update Product</Typography>
        </Box>

        <form onSubmit={handleSubmit(updateProduct)}>
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Name"
            defaultValue={productInfo.name}
            {...register("name")}
          />
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Category"
            defaultValue={productInfo.category}
            {...register("category")}
          />

          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Location"
            defaultValue={productInfo.location}
            {...register("location")}
          />
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="InStock"
            defaultValue={productInfo.inStock}
            {...register("inStock")}
          />
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Rating (1-5)"
            defaultValue={productInfo.rating}
            {...register("rating")}
          />
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Price"
            defaultValue={productInfo.price}
            {...register("price")}
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ margin: "10px 0" }}
            fullWidth
          >
            Update Product
          </Button>
        </form>
        <Button onClick={props.hideModal} color="secondary">
          Close
        </Button>
      </Box>
    </Grid>
  );
};
