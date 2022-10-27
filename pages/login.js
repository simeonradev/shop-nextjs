import { Grid, Paper, TextField, Button, Box, Link } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOG_IN } from "../core/actions";
import registeredUsers from "../components/registeredUsers";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogIn = () => {
    const currentUser = registeredUsers.find(
      (user) => user.username === name && user.password === password
    );

    dispatch({
      type: LOG_IN,
      data: currentUser,
    });
  };

  return (
    <Grid sx={{ display: "flex", pt: "50px" }}>
      <Paper
        elevation={10}
        sx={{
          padding: 3,
          width: 280,
          margin: "20px auto",
        }}
      >
        <Box align="center">
          <h2>Log In</h2>
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
        <Button
          type="submit"
          color="primary"
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
