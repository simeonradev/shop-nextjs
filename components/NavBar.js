import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SELECTED_CATEGORY,
  SEARCH_TERM,
  LOG_OUT,
} from "../core/actions";

import {
  TextField,
  Autocomplete,
  Button,
  IconButton,
  Box,
  AppBar,
  MenuItem,
  Menu,
  Badge,
  Drawer,
} from "@mui/material";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import ShoppingCart from "./ShoppingCart";
import Link from "./Link";
import { ProductListColor } from "../pages/_app";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState("");

  //////////////////////////////// Drop Down Menus /////////////////////////////////

  //1
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);

  const openCategoryMenu = Boolean(categoryMenuAnchor);

  const handleClick = (event) => {
    setCategoryMenuAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setCategoryMenuAnchor(null);
  };

  //2
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const openProfileMenu = Boolean(profileMenuAnchor);

  const handleClickProfileMenu = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setProfileMenuAnchor(null);
  };
  /////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////// Shopping Cart /////////////////////////////////////
  const [cartOpen, setCartOpen] = useState(false);

  const getTotalItems = (items) => {
    return items.reduce((acc, item) => acc + item.amount, 0);
  };

  const dispatch = useDispatch();

  const handleAddToCart = (clickedItem) => {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      data: clickedItem,
    });
  };

  const handleRemoveFromCart = (id) => {
    dispatch({
      type: REMOVE_PRODUCT_FROM_CART,
      data: id,
    });
  };

  const productCartArray = useSelector((state) => {
    return state.productCart.productCartArray;
  });

  const isLogedIn = useSelector((state) => {
    return state.currentUser.isLoggedIn;
  });

  const currentUser = useSelector((state) => {
    return state.currentUser.loggedInUser;
  });

  const productDataArray = useSelector((state) => {
    return state.productData;
  });

  ///////////////////////////////////////////////////////////////////////////////

  const handleChange = (e, v) => {
    setSelected(v === null ? "" : v);
  };

  const testArray = productDataArray.map((test) => test.name);

  const handleLogOut = () => {
    handleCloseProfileMenu();
    dispatch({
      type: LOG_OUT,
    });
  };

  useEffect(() => {
    dispatch({
      type: SEARCH_TERM,
      data: searchValue || selected,
    });
  }, [searchValue, selected, dispatch]);

  const test = useContext(ProductListColor);
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#cf6f00" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0 0 10px #000000",
          border: "1px solid #00000080",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/">
            <Button>
              <Box
                component="img"
                style={{ height: "40px" }}
                alt={"Didi shop logo"}
                src="/images/DidiShopLogo.png"
              />
            </Button>
          </Link>
          <Box sx={{ display: "flex" }}>
            <Autocomplete
              onInputChange={(e) => setSearchValue(e.target.value)}
              id="combo-box"
              options={testArray}
              sx={{ width: 300 }}
              value={selected}
              onChange={handleChange}
              noOptionsText={"No products found"}
              freeSolo={true}
              renderInput={(params) => {
                return <TextField {...params} label="Search" size="small" />;
              }}
            />
            <Link href="/search">
              <IconButton variant="outlined">
                <SearchIcon />
              </IconButton>
            </Link>
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Button
            id="basic-button"
            aria-controls={openCategoryMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openCategoryMenu ? "true" : undefined}
            onClick={handleClick}
          >
            Categories
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={categoryMenuAnchor}
            open={openCategoryMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link href="/filteredByCategory">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "car" });
                  handleClose();
                }}
              >
                Car
              </MenuItem>
            </Link>
            <Link href="/filteredByCategory">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "clothes" });
                  handleClose();
                }}
              >
                Clothes
              </MenuItem>
            </Link>
            <Link href="/filteredByCategory">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "electronics" });
                  handleClose();
                }}
              >
                Electronics
              </MenuItem>
            </Link>
            <Link href="/filteredByCategory">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "food" });
                  handleClose();
                }}
              >
                Food
              </MenuItem>
            </Link>
            <Link href="/filteredByCategory">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "garden" });
                  handleClose();
                }}
              >
                Garden
              </MenuItem>
            </Link>
          </Menu>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Stack direction="row" spacing={10}>
            <Link href="/test">
              <Button variant="contained" color="success">
                TEST
              </Button>
            </Link>
            <Button onClick={test.toggleColor}>change</Button>

            <Link href="/contacts">
              <Button variant="text" color="info">
                Contact Us
              </Button>
            </Link>
          </Stack>
          <Button
            onClick={() => (cartOpen ? setCartOpen(false) : setCartOpen(true))}
          >
            <AddShoppingCartIcon variant="outlined" />
            <Badge
              badgeContent={getTotalItems(productCartArray)}
              color="error"
            ></Badge>
          </Button>
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                width: "400px",
                backgroundColor: "#cf6f00",
              },
            }}
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <ShoppingCart
              cartItems={productCartArray}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          </Drawer>

          {isLogedIn === true ? (
            <Box sx={{ display: "flex" }}>
              <Button
                id="profile-button"
                aria-controls={openProfileMenu ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfileMenu ? "true" : undefined}
                onClick={handleClickProfileMenu}
              >
                <Box
                  component="img"
                  style={{
                    borderRadius: "10px",
                    width: "45px",
                  }}
                  alt={"Profile logo"}
                  src={currentUser === "" ? null : currentUser.img}
                />
              </Button>

              <Menu
                id="profile-menu"
                anchorEl={profileMenuAnchor}
                open={openProfileMenu}
                onClose={handleCloseProfileMenu}
                MenuListProps={{
                  "aria-labelledby": "profile-button",
                }}
              >
                <Link href="/profile">
                  <MenuItem onClick={handleCloseProfileMenu}>
                    My Profile
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default NavBar;
