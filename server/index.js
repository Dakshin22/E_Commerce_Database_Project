const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const e = require("express");

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.get('/:username/:password', async (req, res) =>{
  try
  {
    const {username, password} = req.params
    const userInfo = await pool.query(
      'SELECT username, password FROM users WHERE username = $1 AND password = $2', [username, password]
      )
    if (userInfo.rowCount == 0)
      res.send({message: 'Invalid username or password, please try again'})
    else
      res.json(userInfo.rows)
  }
  catch(err)
  {
    console.error(err.message);
  }
})

app.post('/register', async (req, res) =>{
  try
  {
    const {username, password, fname, lname, address, dob} = req.body;
    
    // Only insert a new user if there aren't any other users with the same username
    const existingUser = await pool.query('SELECT username FROM users WHERE username = $1', [username])
    if (existingUser.rowCount == 0)
    {
      const newUser = await pool.query('INSERT INTO users(username, password, fname, lname, address, DOB) VALUES($1, $2, $3, $4, $5, $6)', 
      [username, password, fname, lname, address, dob])
      res.send('added user to database')
    }
    else
      res.send({message: 'The username is already taken'})
    
  }
  catch(err)
  {
    console.error(err.message);
  }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
  });
  