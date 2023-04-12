import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import ProductList from "../components/ProductList";
import SideNavBar from "../components/SideNavBar1";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, useScrollTrigger, Fade, Fab, Typography } from "@mui/material";

import { GET_PRODUCTS } from "../core/actions";

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

  const dispatch = useDispatch();
  const router = useRouter();

  const onFilter = (filteredProductsByFilters) => {
    setFilteredProductsByFilters(filteredProductsByFilters);
  };

  const allProducts = useSelector((state) => {
    return state.allProducts;
  });

  useEffect(() => {
    dispatch({
      type: GET_PRODUCTS,
    });
  }, []);

  useEffect(() => {
    setFilteredBySearchTerm(
      allProducts.filter((data) => {
        return data.name
          .toLowerCase()
          .includes(router.query.searchTerm?.toLowerCase());
      })
    );
  }, [allProducts, router]);

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
