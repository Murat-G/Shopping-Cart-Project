import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import useBasket from "../../store/useBasket";

function BasketModalSkeleton(props) {
  const { onClose, open } = props;
  const { basket } = useBasket((state) => state);
  return (
    <Dialog
      onClose={onClose}
      open={open}
    >
      <DialogTitle>Your Basket</DialogTitle>
      <List sx={{ width: "22rem", bgcolor: "background.paper" }}>
        <ListItem>
          <Typography style={{ marginRight: "1.5rem" }}>Quantity</Typography>
          <ListItemText id="switch-list-label-wifi" primary="Fruit name" />
          <Typography edge="end">Total</Typography>
        </ListItem>
        {basket.map((product) => (
          <ListItem key={product?.productId}>
            <Typography style={{ marginRight: "4.6rem" }}>
              {product?.quantity}
            </Typography>
            <ListItemText id="switch-list-label-wifi" primary={product?.name} />
            <Typography edge="end">
              {product?.quantity * product?.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

BasketModalSkeleton.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

// eslint-disable-next-line react/prop-types
export default function BasketModal({ openBasket, setOpenBasket }) {
  const handleClose = () => {
    setOpenBasket(false);
  };

  return (
    <div>
      <BasketModalSkeleton open={openBasket} onClose={handleClose} />
    </div>
  );
}
