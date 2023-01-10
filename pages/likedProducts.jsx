import { useState } from "react";
import { TextField, Button, Box, FormControl } from "@mui/material";

const AddProduct = () => {
  const [id, setId] = useState("");

  const addProductToLiked = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/likedProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const likedProductsIds = await res.json();
      console.log("Liked Products Ids:", likedProductsIds);
    }
  };
  return (
    <Box
      style={{
        paddingTop: "60px",
        display: "flex",
        justifyContent: " space-around",
      }}
    >
      <FormControl>
        <TextField value={id} onChange={(event) => setId(event.target.value)} />

        <Button onClick={addProductToLiked}>Add Product</Button>
      </FormControl>
    </Box>
  );
};

export default AddProduct;
