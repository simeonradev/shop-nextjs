import { useEffect, useState } from "react";

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
  Link,
} from "@mui/material";

import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Cart from "./Cart";

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
    return state.productCartReducer.productCartArray;
  });

  const isLogedIn = useSelector((state) => {
    return state.currentUserReducer.logedIn;
  });

  const currentUser = useSelector((state) => {
    return state.currentUserReducer.currentUser;
  });

  const productDataArray = useSelector((state) => {
    return state.productDataReducer.productDataArray;
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
            <Link href="/filteredByCategoryPage">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "car" });
                }}
              >
                Car
              </MenuItem>
            </Link>
            <Link href="/filteredByCategoryPage">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "clothes" });
                }}
              >
                Clothes
              </MenuItem>
            </Link>
            <Link href="/filteredByCategoryPage">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "electronics" });
                }}
              >
                Electronics
              </MenuItem>
            </Link>
            <Link href="/filteredByCategoryPage">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "food" });
                }}
              >
                Food
              </MenuItem>
            </Link>
            <Link href="/filteredByCategoryPage">
              <MenuItem
                onClick={() => {
                  dispatch({ type: SELECTED_CATEGORY, data: "garden" });
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
            <Link href="/contacts">
              <Button variant="text" color="info">
                Contact Us
              </Button>
            </Link>
          </Stack>
          <Button onClick={() => setCartOpen(true)}>
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
            <Cart
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
                  src={currentUser.img}
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
                  <MenuItem>My Profile</MenuItem>
                </Link>
                <Link href="/login">
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Link>
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
