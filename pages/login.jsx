import { Grid, Paper, TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOG_IN } from "../core/actions";
import registeredUsersArray from "../components/registeredUsersArray";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const currentUser = registeredUsersArray.find(
    (user) => user.username === name && user.password === password
  );

  const handleLogIn = () => {
    if (currentUser) {
      dispatch({
        type: LOG_IN,
        data: currentUser,
      });
      router.push("/profile");
    } else {
      setError("Wrong username or password");
    }
  };

  return (
    <Grid sx={{ display: "flex", pt: "60px" }}>
      <Paper
        elevation={10}
        sx={{
          padding: 3,
          width: 280,
          margin: "20px auto",
        }}
      >
        <Box align="center">
          <Typography variant="h4">Log In</Typography>
        </Box>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          sx={{ margin: "10px 0" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography align="center" sx={{ color: "error.main" }}>
          {error}
        </Typography>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          sx={{ margin: "10px 0" }}
          fullWidth
          onClick={handleLogIn}
        >
          Log in
        </Button>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
