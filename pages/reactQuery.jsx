import { Box, Button, Typography } from "@mui/material";
import {
  useDeleteProduct,
  useGetProducts,
  useUpdateProduct,
} from "../core/react-query/features/products";

const ReactQuery = () => {
  const { data: products, isLoading, isError } = useGetProducts("1");
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  console.log(products);

  if (isLoading) {
    return <Typography sx={{ pt: "70px" }}>Loading...</Typography>;
  }
  if (isError) {
    return (
      <Typography sx={{ pt: "70px" }}>
        {JSON.stringify(products.error)}
      </Typography>
    );
  }

  return (
    <Box sx={{ pt: "70px" }}>
      {products.map((post) => {
        return (
          <Box key={post.id}>
            <Box>{post.name}</Box>
            <Button
              disabled={deleteProduct.isLoading}
              onClick={() => deleteProduct.mutate(post.id)}
            >
              Delete
            </Button>
          </Box>
        );
      })}

      <Button
        disabled={updateProduct.isLoading}
        onClick={() =>
          updateProduct.mutate({ id: crypto.randomUUID(), name: "asdf" })
        }
      >
        Add New
      </Button>
    </Box>
  );
};
export default ReactQuery;
