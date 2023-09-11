const poolpgp = require("../db-pgp");

const getProducts = async (req, res) => {
  const { page, pageSize } = req.query;

  // Set default values for page and pageSize if not provided
  const pageNumber = parseInt(page) || 1;
  const itemsPerPage = parseInt(pageSize) || 10;

  try {
    const totalCountQuery = await poolpgp.query(
      "SELECT COUNT(*) as total FROM products"
    );

    const totalCount = totalCountQuery[0].total || 0;

    const offset = (pageNumber - 1) * itemsPerPage;
    const query = `SELECT * FROM products LIMIT ${itemsPerPage} OFFSET ${offset}`;
    const productsQuery = await poolpgp.query(query);
    const products = productsQuery;

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return res.json({
      page: pageNumber,
      pageSize: itemsPerPage,
      totalItems: totalCount,
      totalPages: totalPages,
      products: products,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: err.message });
  }
};

module.exports = getProducts;
