/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import useWindowSize from "../../helper/useWindowSize";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useBasket from "../../store/useBasket";
import axios from "axios";
import useSessionId from "../../store/useSessionId";
import SnackBarAlert from "../snackbar-component/snackBarAlert";

export default function FruitCard({ productInfo }) {
  const isMobile = useWindowSize().width < 1200;
  const [count, setCount] = useState(0);
  const { basket } = useBasket((state) => state);
  const { setBasket } = useBasket((state) => state);
  const { sessionId } = useSessionId((state) => state);
  const [open, setOpen] = useState(false);

  const addProductToBasket = async () => {
    if (!count) {
      setOpen(true);
      return false;
    }
    const headers = {
      "Session-ID": sessionId,
    };
    try {
      await axios.get(
        `https://linkedin-cv-crawler.beta-limited.workers.dev/interview/add-to-cart?id=${productInfo.id}`,
        {
          headers: headers,
        }
      );
      const newProduct = basket?.find((i) => i?.productId == productInfo.id);
      if (newProduct) {
        const newList = basket.map((item) => {
          if (item.productId == productInfo.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        setBasket(newList);
      } else {
        const addNewProduct = {
          productId: productInfo?.id,
          quantity: 1,
          name: productInfo?.name,
          price: productInfo?.price,
        };
        setBasket([...basket, addNewProduct]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const increaseProduct = () => {
    return setCount(count + 1);
  };

  const decreaseProduct = () => {
    return setCount(count - 1);
  };

  const ColorButton = styled(Button)(() => ({
    border: "2px solid #C24B5A",
    width: ".1rem",
    height: "1rem",
    padding: ".75rem 0.1rem",
    color: "#C24B5A",
    fontWeight: "bold",
    fontSize: "1rem",
  }));
  return (
    <Card sx={{ width: 345, marginTop: isMobile ? "2rem" : "0rem", height:545 }}>
      <CardHeader
        action={
          <Box
            sx={{
              width: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            borderColor="transparent"
          >
            <Typography variant="p" color={'#C24B5A'} fontWeight={"bold"}>{productInfo?.discount}</Typography>
            <IconButton aria-label="settings" onClick={addProductToBasket}>
              <AddShoppingCartIcon style={{ fill: "#C24B5A" }} />
            </IconButton>
          </Box>
        }
      />
      <CardMedia
        sx={{ height: 300 }}
        image={productInfo?.image}
        title={productInfo?.name}
        style={{ backgroundColor: "#EFEFEF" }}
      />
      <CardContent>
        <Box
          sx={{
            width: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 50,
          }}
          borderColor="transparent"
        >
          <Box
            sx={{
              width: 345,
              display: "flex",
              alignItems: "center",
            }}
            borderColor="transparent"
          >
            <Typography gutterBottom component="p">
              {productInfo?.name}
            </Typography>
          </Box>
          {count > 0 && (
            <ColorButton
              size="large"
              style={{ fontSize: "1.5rem" }}
              onClick={decreaseProduct}
            >
              -
            </ColorButton>
          )}
        </Box>

        <Box
          sx={{
            width: 292,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          borderColor="transparent"
        >
          <Box
            sx={{
              width: 345,
              display: "flex",
              alignItems: "center",
            }}
            borderColor="transparent"
          >
            <Rating value={parseInt(productInfo?.rating)} max={5} disabled />
            <Typography component="span">{productInfo?.rating} </Typography>
          </Box>
          <Typography component="p">{count}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            width: 345,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          borderColor="transparent"
        >
          <Typography component="div">
            <Typography
              component="span"
              sx={{
                textDecoration: "Line-through",
                color: "#C24B5A",
                marginRight: "1rem",
                marginLeft: ".5rem",
              }}
            >
              ${productInfo?.originalPrice}
            </Typography>
            <Typography component="span">${productInfo?.price}</Typography>
          </Typography>

          <ColorButton size="large" onClick={increaseProduct}>
            +
          </ColorButton>
        </Box>
      </CardActions>
      <SnackBarAlert
        open={open}
        setOpen={setOpen}
        MyMessage={"Please increase the amount of fruit"}
      />
    </Card>
  );
}
