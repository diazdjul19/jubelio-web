const poolpgp = require("../db-pgp");
const path = require("path");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const { name, sku, slug, price, description } = req.body;
    const image = req.file;

    if (!name || !sku || !slug || !price || !description || !image) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: 400 });
    }

    // Save the image file to a specified directory
    const imageDir = path.join(__dirname, "../uploads");
    const imageUrl = `http://localhost:5000/products/uploads/${image.filename}`;

    fs.renameSync(image.path, path.join(imageDir, image.filename));

    // Check Duplicate SKU
    const skuExists = await poolpgp.query(
      "SELECT * FROM products WHERE sku = $1",
      [sku]
    );

    if (skuExists.length > 0) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    // Save to database
    const sql = `INSERT INTO products (name, sku, slug, price, description, img_url) VALUES ($1, $2, $3, $4, $5, $6)`;

    poolpgp
      .query(sql, [name, sku, slug, price, description, imageUrl])
      .then((result) => {
        return res.status(200).json({ message: "success", status: 200 });
      })
      .catch((error) => {
        console.error(error.message);
      });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: err.message });
  }
};

module.exports = createProduct;
