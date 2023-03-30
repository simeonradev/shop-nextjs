import { Grid, Paper, Button, Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const router = useRouter();

  const handleCreateAccount = async (userDetails) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: userDetails.username,
      password: userDetails.password,
      action: "createUser",

      callbackUrl: `${window.location.origin}/profile`,
    });

    if (res?.error) {
      setError("User already exists");
    } else {
      setError(null);
    }
    if (res.url) router.push(res.url);
  };

  const handleLogin = async (userDetails) => {
    console.log(userDetails);
    const res = await signIn("credentials", {
      redirect: false,
      username: userDetails.username,
      password: userDetails.password,
      action: "loginUser",

      callbackUrl: `${window.location.origin}/profile`,
    });

    if (res?.error) {
      setError("Wrong username/password");
    } else {
      setError(null);
    }
    if (res.url) router.push(res.url);
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
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            label="Username"
            placeholder="Enter username"
            sx={{ margin: "5px 0" }}
            {...register("username", { required: true, minLength: 5 })}
          />
          {errors.username && (
            <Typography align="center" sx={{ color: "error.main" }}>
              Username must be at least 5 characters long
            </Typography>
          )}

          <TextField
            label="Password"
            // type="password"
            placeholder="Enter password"
            sx={{ margin: "5px 0" }}
            {...register("password", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/,
            })}
          />

          {errors.password && (
            <Typography align="center" sx={{ color: "error.main" }}>
              Please must contain at least 1 symbol and 1 upper case letter
            </Typography>
          )}
          <Typography align="center" sx={{ color: "error.main" }}>
            {error}
          </Typography>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ margin: "10px 0" }}
            fullWidth
          >
            Login
          </Button>

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            fullWidth
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
