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

//start purchase
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
    const pastOrders = await pool.query("SELECT * FROM Pastorder WHERE username = $1", [username]);
    res.json(pastOrders.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get all items
app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM item");
    res.json(allItems.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// })

// updating item value
app.put("/cart-items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    const itemincart = await pool.query(
      "UPDATE itemincart SET qty = $1 WHERE itemid = $2",
      [qty, id]
    );
    res.json(itemincart);
  } catch (err) {
    console.error(err.message);
  }
});

// temp cartitem, need to change the query, used to display items in shopping cart
app.get("/cart-items", async (req, res) => {
  try {
    const itemsincart = await pool.query("SELECT * from item limit 10");
    res.json(itemsincart.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/cart-items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const itemsincart = await pool.query("DELETE FROM item WHERE itemid = $1", [
      id,
    ]);
    res.json(itemsincart.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// todo implemenet delete cart item
// need to know how we'll represent items in cart first

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
