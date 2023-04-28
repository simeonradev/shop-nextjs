import { Box, Button, Typography } from "@mui/material";
import { AdminProductTable } from "../components/AdminProductTable";
import { useModal } from "../components/useModal";
import { CreateProductModal } from "../modals/CreateProductModal";
import { useSession } from "next-auth/react";
import { useGetProducts } from "../core/react-query/features/products";

const AdminPanel = () => {
  const { data: products } = useGetProducts();
  const { data: session } = useSession();

  const { showModal, hideModal } = useModal();

  const productsByCurrentUser = products.filter((product) => {
    return product.createdBy === session.user.id;
  });

  return (
    <Box sx={{ pt: "60px" }}>
      <Box>
        <Typography> Admin Panel</Typography>
        <Button
          onClick={() =>
            showModal(
              <CreateProductModal
                hideModal={hideModal}
                userProducts={productsByCurrentUser}
              />
            )
          }
        >
          Create Product
        </Button>
      </Box>
      <Box>
        <AdminProductTable products={productsByCurrentUser} />
      </Box>
    </Box>
  );
};

export default AdminPanel;
