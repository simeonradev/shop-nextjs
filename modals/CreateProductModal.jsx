import { Box, Typography, Button, Grid, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../core/actions";
import { v4 as uuid } from "uuid";
import { ControlledTextField } from "../components/ControlledTextField";

const categories = ["car", "clothes", "electronics", "food", "garden"];
const ratings = [1, 2, 3, 4, 5];
const locations = ["Stara Zagora", "Plovdiv", "Sofia"];
// const inStock = [{ yes: true, no: false }];

export const CreateProductModal = (props) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      rating: "",
      category: "",
      location: "",
      price: "",
      inStock: "",
    },
  });
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const unique_id = uuid();

  const createProduct = (productDetails) => {
    console.log(productDetails);
    dispatch({
      type: UPDATE_PRODUCTS,
      data: {
        ...productDetails,
        price: Number(productDetails.price),
        rating: Number(productDetails.rating),
        createdBy: session.user.id,
        id: unique_id,
      },
    });

    props.hideModal();
  };
  return (
    <Grid sx={{ display: "flex", p: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box align="center">
          <Typography variant="h5">Create Product</Typography>
        </Box>

        <form onSubmit={handleSubmit(createProduct)}>
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
            inputProps={{ min: 0 }}
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ margin: "10px 0" }}
            fullWidth
          >
            Create Product
          </Button>
        </form>
        <Button onClick={props.hideModal} color="secondary">
          Close
        </Button>
      </Box>
    </Grid>
  );
};
