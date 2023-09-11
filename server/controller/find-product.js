const poolpgp = require("../db-pgp");

const findProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = await poolpgp.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);

    const data = sql[0];

    return res.json(data);
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: err.message });
  }
};

module.exports = findProduct;
