import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Checkbox,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

const MyProfile = () => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm();

  const updateUserDetails = async (userDetails) => {
    await signIn("credentials", {
      redirect: false,
      username: session.user.username,
      action: "updateUser",
      ...userDetails,
    });
  };

  const handleDeleteUser = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username: session.user.username,
      action: "deleteUser",
    });

    if (res.status === 200) {
      signOut();
    }
  };

  return (
    <Grid sx={{ display: "flex", pt: "100px", pl: "20px" }}>
      {session ? (
        <Paper
          elevation={10}
          sx={{
            padding: 3,
            width: 350,
            margin: "20px auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box align="center">
              <Typography variant="h5">Profile Page</Typography>
            </Box>

            <form onSubmit={handleSubmit(updateUserDetails)}>
              <TextField
                sx={{ margin: "5px 0" }}
                label="Username"
                defaultValue={session.user.username}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                sx={{ margin: "5px 0" }}
                label="Name"
                defaultValue={session.user.name}
                {...register("name")}
              />

              <TextField
                sx={{ margin: "5px 0" }}
                label="Age"
                defaultValue={session.user.age}
                {...register("age")}
              />
              <TextField
                sx={{ margin: "5px 0" }}
                label="Describtion"
                defaultValue={session.user.describtion}
                {...register("describtion")}
              />
              <Box>
                <Checkbox
                  defaultChecked={session.user.isAdmin}
                  {...register("isAdmin")}
                />
                Admin
              </Box>
              <Box>
                <Button type="submit">Apply</Button>
              </Box>

              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ margin: "10px 0" }}
                fullWidth
                onClick={handleDeleteUser}
              >
                Delete User
              </Button>
            </form>
          </Box>
        </Paper>
      ) : (
        <Typography variant="h6">
          You are not Logged In. Please Log In.
        </Typography>
      )}
    </Grid>
  );
};

export default MyProfile;
