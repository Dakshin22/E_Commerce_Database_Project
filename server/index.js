const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body


// app.post("/test", async(req, res) => {

//   try {
//     const { test_id } = req.body;
//     const testItem = await pool.query("INSERT INTO test (test_id) values ($1)", [test_id]);
//     res.json(testItem);
//   } catch (err) {
//     console.error(err.message);
//   }

// })
 
// updating item value
app.put("/placeholder/:id", async(req, res) => {

  try {
    const { id } = req.params;
    const { qty } = req.body;
    const itemincart = await pool.query("UPDATE itemincart SET qty = $1 WHERE itemid = $2", [qty, id]) 
    res.json(itemincart);

  } catch (err) {
    console.error(err.message)
  }
})


// temp cartitem, need to change the query
app.get("/cart-items", async(req, res) => {

  try {
    const itemsincart = await pool.query("SELECT * from item limit 10");
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
  