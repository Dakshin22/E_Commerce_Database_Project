const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//add to cart
app.post("/addToCart", async (req, res) => {
  try {
    const { description } = req.body;
    const newItem = await pool.query(
      "INSERT INTO OrderContainsItem (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});


//start order
app.post("/newOrder", async (req, res) => {
  try {
    const { description } = req.body;
    const newOrder = await pool.query(
      "INSERT INTO Order (description) VALUES($1) RETURNING *",
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

//get items
app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM Items");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});



app.listen(5000, () => {
    console.log("server has started on port 5000");
  });
  