const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const e = require("express");

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userInfo = await pool.query(
      "SELECT username, password FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (userInfo.rowCount == 0)
      res.send({ message: "Invalid credentials, please try again" });
    else res.json(userInfo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, fname, lname, address, dob } = req.body;

    // Only insert a new user if there aren't any other users with the same username
    const existingUser = await pool.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );
    if (existingUser.rowCount == 0) {
      const newUser = await pool.query(
        "INSERT INTO users(username, password, fname, lname, address, DOB) VALUES($1, $2, $3, $4, $5, $6)",
        [username, password, fname, lname, address, dob]
      );
      res.send("added user to database");
    } else res.send({ message: "The username is already taken" });
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/getPurchaseId", async (req, res) => {
  try {
    const { username } = req.body;
    const PurchaseEntry = await pool.query(
      "SELECT purchaseid FROM purchase WHERE username = $1 AND finished IS false",
      [username]
    );

    res.json(PurchaseEntry.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

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
    let newPurchaseEntry;
    let itemAlreadyInCart;
    itemAlreadyInCart = await pool.query(
      "SELECT * FROM purchasecontainsitem WHERE username = $1 AND purchaseid = $2 AND itemid = $3",
      [username, purchaseid, itemid]
    );
    if (itemAlreadyInCart.rows.length === 0) {
      newPurchaseEntry = await pool.query(
        "INSERT INTO PurchaseContainsItem (purchaseid, username, itemid, quantity) VALUES ($1, $2, $3, 1) RETURNING *",
        [purchaseid, username, itemid]
      );
    } else {
      newPurchaseEntry = await pool.query(
        "UPDATE purchasecontainsitem SET quantity = $4 WHERE username = $2 AND purchaseid = $1 AND itemid = $3",
        [purchaseid, username, itemid, itemAlreadyInCart.rows[0].quantity + 1]
      );
    }

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
    const PurchaseEntry = await pool.query(
      "SELECT purchaseid FROM purchase WHERE username = $1 AND finished IS false",
      [username]
    );
    const purchaseId = PurchaseEntry.rows[0].purchaseid;
    let deletionItems;
    if (purchaseId) {
      deletionItems = await pool.query(
        "DELETE FROM purchasecontainsitem WHERE username = $1 AND purchaseid = $2",
        [username, purchaseId]
      );
    }
    const deletion = await pool.query(
      "DELETE FROM Purchase WHERE username = $1 AND finished IS false",
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

// right now only returning title and price, can be changed to whats needed
app.get("/itemsInCart", async (req, res) => {
  try {
    const { username } = req.body;
    const itemsincart = await pool.query(
      "SELECT title, i.price FROM item i JOIN purchasecontainsitem c ON i.itemid = c.itemid JOIN purchase p ON c.purchaseid = p.purchaseid WHERE c.username = $1 AND p.finished = FALSE"
    );
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
      "DELETE FROM purchasecontainsitem WHERE username = $1 AND itemid = $2 and purchaseid = $3",
      [username, id, purchaseid]
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
