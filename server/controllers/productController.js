const Product = require("../models/productModel");

const getProducts = (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      total: results.length,
      data: results,
    });
  });
};

const addProduct = (req, res) => {
  Product.createProduct(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Product Added Successfully",
      productId: result.insertId,
    });
  });
};

module.exports = {
  getProducts,
  addProduct,
};