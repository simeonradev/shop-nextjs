import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const MyProfile = () => {
  const currentUser = useSelector((state) => {
    return state.currentUser.loggedInUser;
  });

  const isLogedIn = useSelector((state) => {
    return state.currentUser.isLoggedIn;
  });

  return (
    <Box sx={{ display: "flex", pt: "50px" }}>
      {isLogedIn === true ? (
        <Box>
          <Box
            component="img"
            src={currentUser.img}
            alt="profile_img"
            style={{ maxHeight: "100px" }}
          />
          <Typography>Name: {currentUser.name}</Typography>
          <Typography>Age: {currentUser.age}</Typography>
          <Typography>Description: {currentUser.description}</Typography>
          <Typography>Favorite Products:</Typography>
          {currentUser.favoriteProducts?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Box>
      ) : (
        <Typography variant="h6">
          You are not Logged In. Please Log In.
        </Typography>
      )}
    </Box>
  );
};

export default MyProfile;
