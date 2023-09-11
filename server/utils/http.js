const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.CUSTOMER_KEY);
const WoocommerceApi = axios.create({
  baseURL: "https://codetesting.jubelio.store",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  auth: {
    username: process.env.CUSTOMER_KEY,
    password: process.env.CUSTOMER_SECRET,
  },
});

module.exports = WoocommerceApi;
