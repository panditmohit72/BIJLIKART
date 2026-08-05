const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "⚡ BIJLIKART Backend Running Successfully",
  });
});

// Database Test
app.get("/api/test-db", (req, res) => {
  db.query("SELECT NOW() AS serverTime", (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Database Connected Successfully",
      data: result,
    });
  });
});

// Product Insert Test
app.get("/api/test-add-product", (req, res) => {
  db.query(
    `INSERT INTO products
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
    VALUES
    (
      1,
      'Samsung Smart TV',
      'Samsung',
      'TV',
      'Test Product',
      50000,
      55000,
      10,
      'demo.jpg',
      '1 Year'
    )`,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.json({
        success: true,
        message: "Dummy Product Added Successfully",
        id: result.insertId,
      });
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});