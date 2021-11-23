const Pool = require("pg").Pool;

const pool = new Pool({

    user: "postgres",
    password: "ayonbmly",
    host: "localhost",
    port: 5432,
    database: "DatabaseProject",

});

module.exports = pool;