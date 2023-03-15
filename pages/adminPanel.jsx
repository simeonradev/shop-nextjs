import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminProductTable } from "../components/AdminProductTable";
import { useModal } from "../components/useModal";
import { GET_PRODUCTS } from "../core/actions";
import { CreateProductModal } from "../modals/CreateProductModal";
import { useSession } from "next-auth/react";

const AdminPanel = () => {
  const { showModal, hideModal } = useModal();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const allProducts = useSelector((state) => {
    return state.allProducts;
  });

  const productsByCurrentUser = allProducts.filter((product) => {
    return product.createdBy === session.user.id;
  });

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS,
    });
  }, []);

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
