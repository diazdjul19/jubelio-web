const router = require("express").Router();
const fetchProductWooCommerce = require("../controller/download-product");
const getProducts = require("../controller/get-products");
const createProduct = require("../controller/create-product");
const findProduct = require("../controller/find-product");
const updateProduct = require("../controller/update-product");
const deleteProducts = require("../controller/delete-products");

const express = require("express");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const date = new Date().toISOString().replace(/:/g, "-");
    const filename = date + "-" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Serve the static files using an absolute path
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

router.get("/download", fetchProductWooCommerce);
router.get("/get-products", getProducts);
router.get("/find-product/:id", findProduct);
router.post("/create-product", upload.single("image"), createProduct);
router.put("/update-product/:id", upload.single("image"), updateProduct);
router.delete("/delete-product/:id", deleteProducts);

module.exports = router;
