import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Axios from "axios";

const PastPurchases = (props) => {
  const [pastOrders, setPastOrders] = useState([]);

  useEffect(() => {
    getpastPurchases();
  }, []);

  const getpastPurchases = async () => {
    Axios.post("http://localhost:5000/pastPurchases", {
      username: props.userInfo.username,
    }).then((response) => {
      console.log(response);
      setPastOrders(response.data);
    });
  };
  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastOrders.map((purchase, idx) => {
              let currPrice = purchase.totalprice
              currPrice.toFixed(2)
              return (
                <TableRow key={idx}>
                  <TableCell>{purchase.checkouttime}</TableCell>
                  <TableCell>{`$ ${currPrice}`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default PastPurchases;
