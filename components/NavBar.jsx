import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SEARCH_TERM,
} from "../core/actions";

import { useMUITheme } from "./useMUITheme";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
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
  Avatar,
  Typography,
} from "@mui/material";

import ShoppingCart from "./ShoppingCart";
import Link from "./Link";

// eslint-disable-next-line no-unused-vars
import { avatarArray } from "../components/avatarArray";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState("");

  const { data: session } = useSession();
  const { theme, toggleColorMode } = useMUITheme();
  const { handleSubmit } = useForm();

  //////////////////////////////// Drop Down Menus /////////////////////////////////

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

  const allProducts = useSelector((state) => {
    return state.allProducts;
  });

  ///////////////////////////////////////////////////////////////////////////////

  const handleChange = (e, v) => {
    setSelected(v === null ? "" : v);
  };

  const searchProducts = allProducts.map((product) => product.name);
  const productsPrices = allProducts.map((product) => product.price);

  const router = useRouter();

  const onSearch = () => {
    const { search } = router;
    const searchParams = new URLSearchParams(search);

    searchParams.set("searchTerm", searchValue || selected);

    searchParams.set("inStock", "");
    searchParams.set("location", "All");
    searchParams.set("category", "All");
    searchParams.set("rating", "");
    searchParams.set("minPrice", `${Math.min(...productsPrices)}`);
    searchParams.set("maxPrice", `${Math.max(...productsPrices)}`);

    router.push(`/search?${searchParams.toString()}`);
  };

  useEffect(() => {
    dispatch({
      type: SEARCH_TERM,
      data: searchValue || selected,
    });
  }, [searchValue, selected, dispatch]);

  // useEffect(() => {
  //   if (session) {
  //     console.log(session.user);
  //     console.log(avatarArray);
  //   }
  // }, [session]);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "#cf6f00",
        backgroundImage: "none",
      }}
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
            <form onSubmit={handleSubmit(onSearch)}>
              <Autocomplete
                onInputChange={(e) => setSearchValue(e.target.value)}
                id="combo-box"
                options={searchProducts}
                sx={{ width: 300 }}
                value={selected}
                onChange={handleChange}
                noOptionsText={"No products found"}
                freeSolo={true}
                renderInput={(params) => {
                  return <TextField {...params} label="Search" size="small" />;
                }}
              />
            </form>

            <IconButton variant="outlined" onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {session?.user.isAdmin === true ? (
            <Link href="/adminPanel">
              <Button variant="contained" color="success">
                Panel
              </Button>
            </Link>
          ) : null}

          <Stack direction="row" spacing={10}>
            <Link href="/contacts">
              <Button variant="text">Contact Us</Button>
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
                backgroundImage: "none",
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
          {session ? (
            <Box sx={{ display: "flex" }}>
              <IconButton
                id="profile-button"
                aria-controls={openProfileMenu ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfileMenu ? "true" : undefined}
                onClick={handleClickProfileMenu}
              >
                <Avatar
                  src={session.user.img}
                  style={{ width: "35px", height: "35px" }}
                />
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={profileMenuAnchor}
                open={openProfileMenu}
                onClose={handleCloseProfileMenu}
                MenuListProps={{
                  "aria-labelledby": "profile-button",
                }}
                sx={{ minWidth: "200px" }}
              >
                <Typography sx={{ textAlign: "center", p: "15px" }}>
                  Hello, {session.user.name}
                </Typography>

                <Link href="/profile">
                  <MenuItem onClick={handleCloseProfileMenu}>
                    My Profile
                  </MenuItem>
                </Link>
                <MenuItem onClick={signOut}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}

          <IconButton onClick={toggleColorMode}>
            {theme.palette.theme === "light" ? (
              <Brightness4Icon style={{ color: "black" }} />
            ) : (
              <Brightness7Icon style={{ color: "white" }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
};

export default NavBar;
