const Pool = require("pg").Pool;

const pool = new Pool({

    user: "postgres",
    password: "passsword",
    host: "localhost",
    port: 5432,
    database: "GroceryStore",

});

module.exports = pool;