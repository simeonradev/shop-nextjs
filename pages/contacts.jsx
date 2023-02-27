import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { AuthContext } from "../components/authContext";
import { log } from "../components/authContext";
const ContactUs = () => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  console.log(authContext, "contacts");
  console.log(log);
  // React.useEffect(() => {
  //   // checks if the user is authenticated
  //   authContext.isUserAuthenticated()
  //     ? router.push("/contacts")
  //     : router.push("/");
  // }, []);

  return (
    <Box sx={{ display: "flex", pt: "60px" }}>Contact us page is here</Box>
  );
};

export default ContactUs;
