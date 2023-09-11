const poolpgp = require("../db-pgp");

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = await poolpgp.query("DELETE FROM products WHERE id = $1", [id]);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: err.message });
  }
};

module.exports = deleteProduct;
