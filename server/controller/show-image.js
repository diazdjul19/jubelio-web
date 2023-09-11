const poolpgp = require("../db-pgp");

const showImage = async (req, res) => {
  try {
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: err.message });
  }
};

module.exports = showImage;
