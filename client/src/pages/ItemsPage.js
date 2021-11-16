import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Paper, Container } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import ItemCard from "../components/ItemCard";

const ItemsPage = () => {
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

  return (
    <>
      {console.log(items)}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {items.map((groceryItem, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} align="center">
              <Container>
                <ItemCard
                  title={groceryItem.title}
                  price={groceryItem.price}
                  id={groceryItem.itemid}
                  img={groceryItem.img}
                  description={groceryItem.description}
                  category={groceryItem.category}
                />
              </Container>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ItemsPage;
