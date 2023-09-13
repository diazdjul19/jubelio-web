// Update with your config settings.

const path = require("path");

/**
 * @type {import('knex').Config}
 */
module.exports = {
  development: {
    client: "postgres",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      database: "jubelio-web",
      user: "postgres",
      password: "root",
      ssl: false,
      schema: "public",
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: false,
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
  },
};
