const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//add to cart
/**
 * Post request
 * adds entry to PurchaseContainsItem talbe
 * needs username, purchaseid, itemid, and quantity
 */
app.post("/addToCart", async (req, res) => {
  try {
    const { username } = req.body;
    const { purchaseid } = req.body;
    const { itemid } = req.body;
    const newPurchaseEntry = await pool.query(
      "INSERT INTO PurchaseContainsItem (purchaseid, username, itemid, quantity) VALUES ($1, $2, $3, 1) RETURNING *",
      [purchaseid, username, itemid]
    );

    res.json(newPurchaseEntry.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//start purchase/new cart
/**
 * Post request
 * Needs user name
 * Inserts a new row into purchases table
 * sets data, price, and finished to null, null, false respectively
 * Response is just the purchase created in json form.
 */
app.post("/newPurchase", async (req, res) => {
  try {
    const { username } = req.body;
    const deletion = await pool.query(
      "DELETE FROM Purchase WHERE username = $1",
      [username]
    );
    const newPurchase = await pool.query(
      "INSERT INTO Purchase (username, date, price, finished) VALUES ($1, NULL, NULL, FALSE) RETURNING *",
      [username]
    );

    res.json(newPurchase.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get previous purchases
/**
 * get requests
 * gets all past purchases for a user
 */
app.get("/pastPurchases", async (req, res) => {
  try {
    const { username } = req.body;
    const pastPurchase = await pool.query(
      "SELECT * FROM Pastpurchase WHERE username = $1",
      [username]
    );
    res.json(pastPurchase.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get all items available
app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM item LIMIT 9");
    res.json(allItems.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//checkout
/**
 * post request
 * updates purcdhase table with timestamp and price information
 * adds row to pastpurchase table
 */
app.post("/checkout", async (req, res) => {
  try {
    const { timestamp } = req.body;
    const { price } = req.body;
    const { username } = req.body;
    const { purchaseid } = req.body;
    const checkedOutPurchase = await pool.query(
      "UPDATE Purchase SET date = $1, price=$2, finished = TRUE, WHERE username = $3 AND purchaseid = $4",
      [timestamp, price, username, purchaseid]
    );
    const newPastOrder = await pool.query(
      "INSERT INTO Pastpurchase (pastpurchaseid, username, checkouttime, totalprice) VALUES ($4, $3, $1, $2)",
      [timestamp, price, username, purchaseid]
    );
    res.json(newPastOrder.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// updating item quantity in cart
app.put("/updateQuantity", async (req, res) => {
  try {
    const { itemid } = req.body;
    const { qty } = req.body;
    const { username } = req.body;
    const { purchaseid } = req.body;
    const itemincart = await pool.query(
      "UPDATE PurchaseContainsItem SET quantity = $1 WHERE itemid = $2 AND username = $3 AND purchaseid = $4",
      [qty, itemid, username, purchaseid]
    );
    res.json(`Quantity was updated to ${qty}!`);
  } catch (err) {
    console.error(err.message);
  }
});

// temp cartitem, need to change the query, used to display items in shopping cart
app.get("/itemsInCart", async (req, res) => {
  try {
    const { username } = req.body;
    const itemsincart = await pool.query("SELECT * from item limit 10");
    res.json(itemsincart.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// remove item from cart
app.delete("/cart-items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const { purchaseid } = req.body;
    const itemsincart = await pool.query(
      "DELETE FROM purchaseContainsItem WHERE itemid = $1 AND purchaseid = $2 AND username = $3",
      [id, purchaseid, username]
    );
    res.json(`Item with id ${id} deleted from Cart`);
  } catch (err) {
    console.error(err.message);
  }
});

// todo implemenet delete cart item
// need to know how we'll represent items in cart first

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
