import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Paper, Container } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import ItemCard from "../components/ItemCard";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const ItemsPage = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currUser, setCurrUser] = useState("dakshin");
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    setLoading(true);
    const url = `http://localhost:5000/items`;

    try {
      const response = await axios.get(url);
      setItems(response.data);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const addToCart = async (itemid) => {
    let url = `http://localhost:5000/getPurchaseId`;
    let purchaseId;
    try {
      const response = await axios.post(url, {
        username: props.userInfo.username,
      });
      purchaseId = response.data.purchaseid;
    } catch (error) {
      console.log("error getting purchaseId", error.message);
    }
    console.log("purchase id", purchaseId);
    if (!purchaseId) {
      url = `http://localhost:5000/newPurchase`;
      try {
        const response = await axios.post(url, {
          username: props.userInfo.username,
        });
        purchaseId = response.data.purchaseid;
      } catch (error) {
        console.log("error when creating new cart", error.message);
      }
    }

    url = `http://localhost:5000/addToCart`;
    try {
      const response = await axios.post(url, {
        username: props.userInfo.username,
        purchaseid: purchaseId,
        itemid: itemid,
      });
      let newPurchase = response.data;
    } catch (error) {
      console.log("error when adding item to cart", error.message);
    }
  };

  return (
    <>
      {!props.userInfo.isLoggedIn ? (
        <Navigate to="/" />
      ) : 
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {items.map((groceryItem, index) => (
              <Grid item xs={2} sm={4} md={2} key={index} align="center">
                <Container>
                  <ItemCard
                    title={groceryItem.title}
                    price={groceryItem.price}
                    id={groceryItem.itemid}
                    img={groceryItem.img}
                    description={groceryItem.description}
                    category={groceryItem.category}
                    addToCart={addToCart}
                  />
                </Container>
              </Grid>
            ))}
          </Grid>
        </Box>
      }
    </>
  );
};

export default ItemsPage;
