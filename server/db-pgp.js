const pgp = require("pg-promise")();
const db = pgp({
  host: "localhost",
  port: 5432,
  database: "jubelio-web",
  user: "postgres",
  password: "root",
});

module.exports = db;
