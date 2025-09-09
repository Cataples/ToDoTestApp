const sql = require("mysql2");

const pool = sql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123qwe!@#QWE",
  database: "todolist"
}).promise();

module.exports = pool;