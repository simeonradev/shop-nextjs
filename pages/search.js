import { useEffect, useState } from "react";

import SideNavBar from "../components/SideNavBar";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Box, useScrollTrigger, Fade, Fab } from "@mui/material";

import { useSelector } from "react-redux";
import ProductList from "../components/ProductList";

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
  const [filteredBySearch, setFilteredBySearch] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(filteredBySearch);

  const onFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  const searchValue = useSelector((state) => {
    return state.searchTermReducer.searchTerm;
  });

  const productDataArray = useSelector((state) => {
    return state.productDataReducer.productDataArray;
  });

  useEffect(() => {
    setFilteredBySearch(
      productDataArray.filter((data) => {
        return data.name.toLowerCase().includes(searchValue.toLowerCase());
      })
    );
  }, [searchValue]);

  return (
    <Box>
      <Box sx={{ display: "flex", pt: "50px" }}>
        <SideNavBar data={filteredBySearch} onFilter={onFilter}></SideNavBar>
        <ProductList products={filteredProducts} p={3} />
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
