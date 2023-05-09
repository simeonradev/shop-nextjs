import { Box, Typography, Button, Grid, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { ControlledTextField } from "../components/ControlledTextField";
import { useUpdateProduct } from "../core/react-query/features/products";

const categories = ["car", "clothes", "electronics", "food", "garden"];
const ratings = [1, 2, 3, 4, 5];
const locations = ["Stara Zagora", "Plovdiv", "Sofia"];

export const UpdateProductModal = (props) => {
  const updateProduct = useUpdateProduct();

  const productInfo = props.productDetails;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: productInfo.name,
      rating: productInfo.rating,
      category: productInfo.category,
      location: productInfo.location,
      price: productInfo.price,
      inStock: productInfo.inStock,
    },
  });

  const updateProductSubmit = (productDetails) => {
    updateProduct.mutate({
      ...productDetails,
      price: Number(productDetails.price),
      rating: Number(productDetails.rating),
      createdBy: productInfo.createdBy,
      id: productInfo.id,
    });

    props.hideModal();
  };

  return (
    <Grid sx={{ display: "flex", p: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box align="center">
          <Typography variant="h5">Update Product</Typography>
        </Box>

        <form onSubmit={handleSubmit(updateProductSubmit)}>
          <ControlledTextField
            name="name"
            label="Name"
            control={control}
            sx={{ margin: "5px 0" }}
          />

          <ControlledTextField
            name="category"
            label="Category"
            control={control}
            sx={{ margin: "5px 0" }}
            select
            renderValue={(value) => value}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </ControlledTextField>

          <ControlledTextField
            name="location"
            label="Location"
            control={control}
            sx={{ margin: "5px 0" }}
            select
            renderValue={(value) => value}
          >
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </ControlledTextField>

          <ControlledTextField
            name="inStock"
            label="InStock"
            control={control}
            sx={{ margin: "5px 0" }}
          />

          <ControlledTextField
            name="rating"
            label="Rating"
            control={control}
            sx={{ margin: "5px 0" }}
            select
            renderValue={(value) => value}
          >
            {ratings.map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating}
              </MenuItem>
            ))}
          </ControlledTextField>

          <ControlledTextField
            type="number"
            name="price"
            label="Price"
            control={control}
            sx={{ margin: "5px 0" }}
            InputProps={{ inputProps: { min: 0 } }}
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
