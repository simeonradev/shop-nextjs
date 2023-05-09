import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ProductList from "../components/ProductList";
import SideNavBar from "../components/SideNavBar";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, useScrollTrigger, Fade, Fab, Typography } from "@mui/material";

import { useGetProducts } from "../core/react-query/features/products";

/////////////////////////////Floating to Top Button///////////////////////////////////////////////
function ScrollTop(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Fade in={trigger}>
      <Box
        onClick={() => window.scrollTo(0, 0)}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
/////////////////////////////////////////////////////////////////////////////////////

const Search = (props) => {
  const [filteredBySearchTerm, setFilteredBySearchTerm] = useState([]);
  const [filteredProductsByFilters, setFilteredProductsByFilters] =
    useState(filteredBySearchTerm);

  const { data: products } = useGetProducts();

  const router = useRouter();

  const onFilter = (filteredProductsByFilters) => {
    setFilteredProductsByFilters(filteredProductsByFilters);
  };

  useEffect(() => {
    setFilteredBySearchTerm(
      products?.filter((data) => {
        return data.name
          .toLowerCase()
          .includes(router.query.searchTerm?.toLowerCase());
      })
    );
  }, [products, router]);

  // console.log(filteredBySearchTerm, filteredProductsByFilters);
  return (
    <Box>
      <Box sx={{ display: "flex", pt: "60px" }}>
        <SideNavBar
          data={filteredBySearchTerm}
          onFilter={onFilter}
        ></SideNavBar>
        {filteredProductsByFilters.length === 0 ? (
          <Typography variant="h4">
            No products found, try searching something else
          </Typography>
        ) : (
          <ProductList products={filteredProductsByFilters} p={3} />
        )}
      </Box>

      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default Search;
