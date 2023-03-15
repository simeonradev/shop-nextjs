import { Box, Button, Stack } from "@mui/material";
import { useModal } from "../components/useModal";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { DELETE_PRODUCT } from "../core/actions";
import { UpdateProductModal } from "../modals/UpdateProductModal";

export const AdminProductTable = ({ products }) => {
  const { showModal, hideModal } = useModal();

  const dispatch = useDispatch();

  const columns = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "category", headerName: "Category", width: 150 },

    {
      field: "location",
      headerName: "Location",
      width: 130,
      align: "right",
      headerAlign: "right",
    },

    {
      field: "inStock",
      headerName: "In Stock",
      width: 130,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      width: 120,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 120,
    },

    {
      field: "action",
      headerName: "Edit Product",
      width: 280,
      sortable: false,
      disableClickEventBubbling: true,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => {
        const currentRow = params.row;

        const onClickEdit = () => {
          showModal(
            <UpdateProductModal
              hideModal={hideModal}
              productDetails={currentRow}
            />
          );
        };

        const onClickDelete = () => {
          const currentRow = params.row;
          dispatch({
            type: DELETE_PRODUCT,
            data: currentRow.id,
          });
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={onClickEdit}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={onClickDelete}
            >
              Delete
            </Button>
          </Stack>
        );
      },
    },
  ];

  const rows = products;

  return (
    <Box sx={{ height: "100vh", width: "100%", display: "flex" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[20]}
      />
    </Box>
  );
};
