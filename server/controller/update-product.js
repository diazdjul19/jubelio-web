const poolpgp = require("../db-pgp");
const path = require("path");
const fs = require("fs");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, slug, price, description } = req.body;
    const image = req.file;

    if (!name || !sku || !slug || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Jika tidak ada gambar baru yang diunggah, gunakan URL gambar yang sudah ada
    let imageUrl = `http://localhost:5000/uploads/${image.filename}`;

    if (image) {
      const imageDir = path.join(__dirname, "../uploads");
      imageUrl = `http://localhost:5000/products/uploads/${image.filename}`;
      fs.renameSync(image.path, path.join(imageDir, image.filename));
    }

    // Check Duplicate SKU
    const skuExists = await poolpgp.query(
      "SELECT * FROM products WHERE sku = $1 AND id != $2",
      [sku, id]
    );

    if (skuExists.length > 0) {
      return res
        .status(400)
        .json({ message: "SKU already exists", status: 400 });
    }

    // Update the database record
    const sql = `UPDATE products SET name = $1, sku = $2, slug = $3, price = $4, description = $5, img_url = $6 WHERE id = $7`;

    poolpgp
      .query(sql, [name, sku, slug, price, description, imageUrl, id])
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

module.exports = updateProduct;
