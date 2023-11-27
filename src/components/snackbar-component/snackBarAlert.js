import React from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// eslint-disable-next-line react/prop-types
const SnackBarAlert = ({ MyMessage, open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}
      message={MyMessage}
      action={action}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    />
  );
};

export default SnackBarAlert;
