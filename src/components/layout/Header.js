/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchBar from "../search-bar/SearchBar";
import { styled } from "@mui/material/styles";
import axios from "axios";
import SnackBarAlert from "../snackbar-component/snackBarAlert";
import BasketModal from "../basket-modal/basketModal";
import useWindowSize from "../../helper/useWindowSize";

export default function Header({ setProducts, basket }) {
  const [fruit, setFruit] = useState("");
  const [open, setOpen] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);
  const isMobile = useWindowSize().width < 600;
  const searchProduct = async () => {
    if (!fruit) {
      setOpen(true);
      return false;
    }
    try {
      const res = await axios.post(
        `https://linkedin-cv-crawler.beta-limited.workers.dev/interview/search?name=${fruit}`
      );
      setProducts(res?.data);
      setFruit("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBasketOpen = () => {
    setOpenBasket(true);
  };

  const ColorButton = styled(Button)(() => ({
    backgroundColor: "#C24B5A",
    "&:hover": {
      backgroundColor: "#C24B5A",
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BasketModal openBasket={openBasket} setOpenBasket={setOpenBasket} />
      <SnackBarAlert
        open={open}
        setOpen={setOpen}
        MyMessage={"Please enter a fruit name"}
      />

      <AppBar position="static" style={{ background: '#D66C6E' }}>
        <Toolbar style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {isMobile ? (
              <img src="/logo.jpg" width={25} height="auto" />
              ) : (
              <img src="/logo-light.png" width={100} height="auto" />
            )}
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <>
            <SearchBar setFruit={setFruit} fruit={fruit} />
            <ColorButton
              sx={{ background: "#C24B5A" }}
              variant="contained"
              style={{
                width: "10rem",
                borderRadius: "0rem 3rem 3rem 0rem",
                padding: ".45rem",
              }}
              onClick={searchProduct}
            >
              Search
            </ColorButton>
            <Box sx={{ flexGrow: 1 }} />
            <>
              <IconButton
                size="large"
                aria-label="notifications"
                color="inherit"
              >
                <Badge badgeContent={basket?.length} color="error">
                  <ShoppingBagIcon onClick={handleBasketOpen} />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
