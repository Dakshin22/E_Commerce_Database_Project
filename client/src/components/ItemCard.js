import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const ItemCard = (props) => {

  
  const { title } = props;
  let { price } = props;
  price = price.toFixed(2);
  const { id } = props;
  const { img } = props;
  const { description } = props;
  const { category } = props;
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          image= {img}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
        <Typography variant="button" display="block" gutterBottom>
        ${price}
      </Typography>
        <IconButton
            size="large"
            aria-label="addShoppingCart"
            sx={{ mr: 2 }}
            onClick = {()=>{props.addToCart(id)}}
            align = "right"
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default ItemCard;
