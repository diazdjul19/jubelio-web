const WoocommerceApi = require("../utils/http");
const poolpgp = require("../db-pgp");

const fetchProductWooCommerce = async (req, res) => {
  try {
    // insert axios
    const response = await WoocommerceApi.get(
      "/wp-json/wc/v3/products?page=1&page_size=100"
    );

    const data = response.data;

    data.forEach((item) => {
      const { name, sku, slug, price, description, images } = item;

      const sql = `INSERT INTO products (name, sku, slug, price, description, img_url) VALUES ($1, $2, $3, $4, $5, $6)`;

      poolpgp
        .query(sql, [name, sku, slug, price, description, images[0].src])
        .then((result) => {
          console.log(`Success Insert` + result);
        })
        .catch((error) => {
          console.error(error.message);
        });
    });

    return res.status(200).json({ message: "success", data: response.data });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: err.message });
  }
};

module.exports = fetchProductWooCommerce;
