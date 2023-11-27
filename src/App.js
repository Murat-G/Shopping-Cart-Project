import React, { useEffect, useState } from "react";
import Header from "../src/components/layout/Header";
import Footer from "./components/layout/Footer";
import axios from "axios";
import FruitCard from "./components/card-component/fruitCard";
import useSessionId from "./store/useSessionId";
import useBasket from "./store/useBasket";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const App = () => {
  const { sessionId } = useSessionId((state) => state);
  const { getSession } = useSessionId((state) => state);

  const { basket } = useBasket((state) => state);
  const { setBasket } = useBasket((state) => state);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!sessionId) {
      getSession();
    }
  }, []);

  const getproduct = async () => {
    try {
      const res = await axios.post(
        "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/products"
      );
      setProducts(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (sessionId) {
      getproduct();
    }
  }, [sessionId]);

  const getBasket = async () => {
    const headers = {
      "Session-ID": sessionId,
    };
    try {
      const res = await axios.get(
        "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/view-cart",
        {
          headers: headers,
        }
      );
      if (res?.data == "Cart is empty.") {
        setBasket([]);
      } else {
        setBasket(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (sessionId) {
      getBasket();
    }
  }, [sessionId]);

  const ColorButton = styled(Button)(() => ({
    backgroundColor: "#C24B5A",
    "&:hover": {
      backgroundColor: "#C24B5A",
    },
  }));

  return (
    <div>
      <Header setProducts={setProducts} basket={basket} />
      <Box
        sx={{
          display: "flex",
          alignItems: "space-around",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: "2rem",
          minHeight: "30rem",
        }}
        borderColor="transparent"
      >
        {products?.map((p) => {
          if (p.id) {
            return <FruitCard key={p?.id} productInfo={p} />;
          }
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "4rem",
        }}
      >
        {products?.length < 1 && <>fruit not found </>}
        <ColorButton
          sx={{ background: "#C24B5A" }}
          variant="contained"
          style={{
            width: "10rem",
            borderRadius: ".4rem",
            padding: ".45rem",
            "&:hover": {
              color: "#C24B5A",
            },
          }}
          onClick={getproduct}
        >
          {products?.length < 1 ? "Go back" : "Load More..."}
        </ColorButton>
      </Box>
      <Footer />
    </div>
  );
};

export default App;
