import { Button, DialogContent, Typography } from "@mui/material";

export const LikeButtonModal = (props) => {
  return (
    <DialogContent>
      <Typography>Please log in to like products</Typography>
      <Button onClick={props.hideModal} color="secondary">
        close
      </Button>
    </DialogContent>
  );
};
