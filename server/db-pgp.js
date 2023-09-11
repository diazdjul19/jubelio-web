const pgp = require("pg-promise")();
const db = pgp({
  host: "localhost",
  port: 5432,
  database: "perntodo",
  user: "postgres",
  password: "root",
});

module.exports = db;
