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
} from "@mui/material";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import ShoppingCart from "./ShoppingCart";
import { useRouter } from "next/router";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState("");
  const router = useRouter();

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
          <Button onClick={() => router.push("/")}>
            <Box
              component="img"
              style={{ height: "40px" }}
              alt={"Didi shop logo"}
              src="/images/DidiShopLogo.png"
            />
          </Button>
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
            <IconButton
              variant="outlined"
              onClick={() => router.push("/search")}
            >
              <SearchIcon />
            </IconButton>
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
            <MenuItem
              onClick={() => {
                dispatch({ type: SELECTED_CATEGORY, data: "car" });
                router.push("/filteredByCategory");
              }}
            >
              Car
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch({ type: SELECTED_CATEGORY, data: "clothes" });
                router.push("/filteredByCategory");
              }}
            >
              Clothes
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch({ type: SELECTED_CATEGORY, data: "electronics" });
                router.push("/filteredByCategory");
              }}
            >
              Electronics
            </MenuItem>

            <MenuItem
              onClick={() => {
                dispatch({ type: SELECTED_CATEGORY, data: "food" });
                router.push("/filteredByCategory");
              }}
            >
              Food
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch({ type: SELECTED_CATEGORY, data: "garden" });
                router.push("/filteredByCategory");
              }}
            >
              Garden
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Stack direction="row" spacing={10}>
            <Button
              variant="contained"
              color="success"
              onClick={() => router.push("/test")}
            >
              TEST
            </Button>
            <Button
              variant="text"
              color="info"
              onClick={() => router.push("/contacts")}
            >
              Contact Us
            </Button>
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
                <MenuItem onClick={() => router.push("/profile")}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default NavBar;
