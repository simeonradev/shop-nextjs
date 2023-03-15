import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../core/actions";
import { v4 as uuid } from "uuid";

export const CreateProductModal = (props) => {
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const unique_id = uuid();

  const createProduct = (productDetails) => {
    dispatch({
      type: UPDATE_PRODUCTS,
      data: {
        ...productDetails,
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
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Name"
            {...register("name")}
          />
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Category"
            {...register("category")}
          />

          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Location"
            {...register("location")}
          />
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="InStock"
            {...register("inStock")}
          />
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Rating (1-5)"
            {...register("rating")}
          />
          <TextField
            sx={{ margin: "5px 0", width: "350px" }}
            label="Price"
            {...register("price")}
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
