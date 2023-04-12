import { useEffect, useState } from "react";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { styled } from "@mui/system";

import {
  Chip,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  Drawer,
  FormControlLabel,
  Tooltip,
  Button,
} from "@mui/material";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SideNavBarBox = styled(Box)`
  background-color: #cf6f00;
  border: 2px solid #00000080;
  box-shadow: 0 0 1px #000000;
  overflow-x: hidden;
  padding-top: 20px;
  position: fixed;
  top: 53px;
  width: 180px;
  text-align: center;
  height: 100%;
`;

const SideNavBar = ({ onFilter }) => {
  const router = useRouter();

  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedInStock, setSelectedInStock] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const searchTerm = useSelector((state) => {
    return state.searchTerm;
  });

  const allProducts = useSelector((state) => {
    return state.allProducts;
  });

  const locationArray = allProducts.filter((product) => {
    if (product.location === selectedLocation || selectedLocation === "All") {
      return product;
    }
  });

  const categoryArray = locationArray.filter((product) => {
    if (product.category === selectedCategory || selectedCategory === "All") {
      return product;
    }
  });

  const ratingArray = categoryArray.filter((product) => {
    if (product.rating === selectedRating || selectedRating === "") {
      return product;
    }
  });

  const inStockArray = ratingArray.filter((product) => {
    if (product.inStock === selectedInStock || selectedInStock === "") {
      return product;
    }
  });

  const filteredBySearch = inStockArray.filter((data) => {
    return data.name
      .toLowerCase()
      .includes(router.query.searchTerm?.toLowerCase());
  });

  console.log(filteredBySearch, "new");

  const availableRatings = [
    { rating: 1 },
    { rating: 2 },
    { rating: 3 },
    { rating: 4 },
    { rating: 5 },
  ];

  //////////////////////////////////// Handle Change ////////////////////////////////

  const handleLocationChange = (event) => {
    const inputLocation = String(event);

    if (inputLocation === selectedLocation) {
      setSelectedLocation("All");
    } else {
      setSelectedLocation(inputLocation);
    }
  };

  const handleCategoryChange = (event) => {
    const inputCategory = String(event);
    if (inputCategory === selectedCategory) {
      setSelectedCategory("All");
    } else {
      setSelectedCategory(inputCategory);
    }
  };

  const handleStockChange = (event) => {
    const inputInStock = Boolean(event.target.value);
    if (inputInStock === selectedInStock) {
      setSelectedInStock("");
    } else {
      setSelectedInStock(inputInStock);
    }
  };

  const handleRatingChange = (event) => {
    const inputRating = Number(event.target.id);

    if (inputRating === selectedRating) {
      setSelectedRating("");
    } else {
      setSelectedRating(inputRating);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// Handle Delete ////////////////////////////////

  const handleDeleteLocation = () => {
    setSelectedLocation("All");

    router.query = { ...router.query, location: "All" };
    router.push(router, undefined, { shallow: true });
  };

  const handleDeleteCategory = () => {
    setSelectedCategory("All");

    router.query = { ...router.query, category: "All" };
    router.push(router, undefined, { shallow: true });
  };

  const handleDeleteStock = () => {
    setSelectedInStock("");

    router.query = { ...router.query, inStock: "" };
    router.push(router, undefined, { shallow: true });
  };

  const handleDeleteRating = () => {
    setSelectedRating("");

    router.query = { ...router.query, rating: "" };
    router.push(router, undefined, { shallow: true });
  };
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////// Chips //////////////////////////////

  const locationChip = {
    onDelete: handleDeleteLocation,
    label: "Clear Location",
    icon: <LocationOnOutlinedIcon />,
  };
  const stockChip = {
    onDelete: handleDeleteStock,
    label: "Clear Stock",
    icon: <InventoryOutlinedIcon />,
  };
  const ratingChip = {
    onDelete: handleDeleteRating,
    label: "Clear Rating",
    icon: <GradeOutlinedIcon />,
  };
  const categoryChip = {
    onDelete: handleDeleteCategory,
    label: "Clear Category",
    icon: <CategoryOutlinedIcon />,
  };

  const chipArray = [];

  selectedLocation !== "All" && chipArray.push(locationChip);
  selectedCategory !== "All" && chipArray.push(categoryChip);

  selectedInStock !== "" && chipArray.push(stockChip);
  selectedRating !== "" && chipArray.push(ratingChip);

  /////////////////////////////////////////////////////////////////////////////////

  const click = () => {
    const { search } = router;
    const searchParams = new URLSearchParams(search);

    searchParams.set("searchTerm", `${searchTerm}`);
    searchParams.set("inStock", `${selectedInStock}`);
    searchParams.set("location", `${selectedLocation}`);
    searchParams.set("category", `${selectedCategory}`);
    searchParams.set("rating", `${selectedRating}`);

    router.push(`/search?${searchParams.toString()}`);

    onFilter(filteredBySearch);
  };

  // console.log(filteredProducts);

  // useEffect(() => {
  //   setSelectedLocation(
  //     router.query?.location ? String(router.query?.location) : "All"
  //   );
  //   setSelectedCategory(
  //     router.query?.category ? String(router.query?.category) : "All"
  //   );
  //   setSelectedInStock(Boolean(router.query?.inStock) || "");
  //   setSelectedRating(Number(router.query?.rating) || "");
  // }, []);
  useEffect(() => {
    const { search } = router;
    const searchParams = new URLSearchParams(search);

    searchParams.set("searchTerm", `${searchTerm}`);
    searchParams.set("inStock", `${selectedInStock}`);
    searchParams.set("location", `${selectedLocation}`);
    searchParams.set("category", `${selectedCategory}`);
    searchParams.set("rating", `${selectedRating}`);

    router.push(`/search?${searchParams.toString()}`);
  }, [
    selectedRating,
    selectedCategory,
    selectedLocation,
    selectedInStock,
    searchTerm,
  ]);

  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          width: 180,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            border: "none",
            width: 180,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <Box>
            <SideNavBarBox>
              {chipArray.map((chip, i) => (
                <Tooltip key={i} title={chip.label}>
                  <Chip
                    color="warning"
                    onDelete={chip.onDelete}
                    icon={chip.icon}
                  />
                </Tooltip>
              ))}
              <Box sx={{ width: 150, margin: "20px auto 20px auto" }}></Box>
              <Box sx={{ textAlign: "center" }}>
                <FormControl sx={{ m: 1, minWidth: 160 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={
                      selectedCategory === "All" ? "All" : selectedCategory
                    }
                    label="Category"
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      handleCategoryChange(e.target.value);
                    }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="car">Car</MenuItem>
                    <MenuItem value="clothes">Clothes</MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="garden">Garden</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FormControl sx={{ m: 1, minWidth: 160 }}>
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={
                      selectedLocation === "All" ? "All" : selectedLocation
                    }
                    label="Location"
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      handleLocationChange(e.target.value);
                    }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Plovdiv">Plovdiv</MenuItem>
                    <MenuItem value="Sofia">Sofia</MenuItem>
                    <MenuItem value="Stara Zagora">Stara Zagora</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <h3> Availability:</h3>
              <FormControlLabel
                value="start"
                control={
                  <Checkbox
                    type="checkbox"
                    value={true}
                    onChange={handleStockChange}
                    checked={selectedInStock === true}
                  />
                }
                label="In Stock:"
                labelPlacement="start"
              />
              <h3> Sort by Rating:</h3>
              {availableRatings.map((object, i) => {
                return (
                  <Box key={i}>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          type="checkbox"
                          onChange={handleRatingChange}
                          checked={selectedRating === object.rating}
                          id={object.rating.toString()}
                        />
                      }
                      label={`Rating: ${object.rating}`}
                      labelPlacement="start"
                    />
                  </Box>
                );
              })}
              <Button onClick={click}>asd</Button>
            </SideNavBarBox>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideNavBar;
