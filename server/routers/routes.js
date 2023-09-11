const router = require("express").Router();
const products = require("./product");

router.use("/products", products);

module.exports = router;
