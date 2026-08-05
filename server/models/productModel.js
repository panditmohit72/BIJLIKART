const db = require("../config/db");

const getAllProducts = (callback) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";
  db.query(sql, callback);
};

const createProduct = (product, callback) => {
  const sql = `
  INSERT INTO products
  (
    shop_id,
    product_name,
    brand,
    category,
    description,
    price,
    mrp,
    stock,
    image,
    warranty
  )
  VALUES (?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      product.shop_id,
      product.product_name,
      product.brand,
      product.category,
      product.description,
      product.price,
      product.mrp,
      product.stock,
      product.image,
      product.warranty,
    ],
    callback
  );
};

module.exports = {
  getAllProducts,
  createProduct,
};