import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  Container,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import ItemCard from "../components/ItemCard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const MyCartPage = (props) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getItemsInCart();
  }, []);

  const getItemsInCart = async () => {
    setLoading(true);
    const url = `http://localhost:5000/itemsInCart`;

    try {
      const response = await axios.post(url, {
        username: props.userInfo.username,
      });
      setItemsInCart(response.data);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const checkout = async () => {
    const url = `http://localhost:5000/checkout`;

    try {
      const response = await axios.post(url, {
        username: props.userInfo.username,
        price: totalFormat,
      });

      getItemsInCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  const TAX_RATE = 0.07;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  function subtotal(items) {
    console.log(items);
    return items
      .map((item) => priceRow(item.quantity, item.price))
      .reduce((sum, i) => sum + i, 0);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const deleteItem = async (itemid) => {
    const url = `http://localhost:5000/removeItem`;
    console.log(itemid);
    try {
      const response = await axios.delete(url, {
        data: { username: props.userInfo.username, id: itemid },
      });
      setItemsInCart(itemsInCart.filter(item => item.itemid !== itemid));
    } catch (error) {
      console.log(error.message);
    }
  };

  let currItems = itemsInCart;
  const invoiceSubtotal = subtotal(itemsInCart);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  const totalFormat = invoiceTotal.toFixed(2);

  return (
    <>
      {!props.userInfo.isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  
                {!(itemsInCart.length === 0) && itemsInCart.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">$ {item.price}</TableCell>
                    <TableCell align="right">
                      $ {ccyFormat(priceRow(item.price, item.quantity))}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => {deleteItem(item.itemid)}}>
                        Delete Item
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    $ {ccyFormat(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">
                    $ {ccyFormat(invoiceTaxes)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">
                    $ {ccyFormat(invoiceTotal)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            disabled={itemsInCart.length === 0}
            onClick={() => {
              checkout();
              handleClick();
            }}
          >
            Checkout
          </Button>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Checkout Successful!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyCartPage;
