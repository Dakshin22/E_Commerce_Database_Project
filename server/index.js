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
      "INSERT INTO OrderContainsItem (username) VALUES($1) (purchaseid) VALUES($2) (itemid) VALUES($3) RETURNING *",
      [username, purchaseid, itemid]
    );

    res.json(newPurchaseEntry.rows);
  } catch (error) {
    console.error(error.message);
  }
});


//start order
app.post("/newPurchase", async (req, res) => {
  try {
    const { description } = req.body;
    const newOrder = await pool.query(
      "INSERT INTO Purchase (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//getr previopus orders
app.get("/orders", async (req, res) => {
  try {
    const pastOrders = await pool.query("SELECT * FROM Pastorder");
    res.json(allTodos.rows);
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
app.put("/cart-items/:id", async(req, res) => {

  try {
    const { id } = req.params;
    const { qty } = req.body;
    const itemincart = await pool.query("UPDATE itemincart SET qty = $1 WHERE itemid = $2", [qty, id]) 
    res.json(itemincart);

  } catch (err) {
    console.error(err.message)
  }
})


// temp cartitem, need to change the query, used to display items in shopping cart
app.get("/cart-items", async(req, res) => {

  try {
    const itemsincart = await pool.query("SELECT * from item limit 10");
    res.json(itemsincart.rows);

  } catch (err) {
    console.error(err.message)
  }
})

app.delete("/cart-items/:id", async(req, res) => {

  try {
    const { id } = req.params;
    const itemsincart = await pool.query("DELETE FROM item WHERE itemid = $1", [id]);
    res.json(itemsincart.rows);

  } catch (err) {
    console.error(err.message)
  }
})

// todo implemenet delete cart item
// need to know how we'll represent items in cart first

app.listen(5000, () => {
    console.log("server has started on port 5000");
  });
  