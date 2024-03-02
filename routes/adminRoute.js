const express = require("express");
const router = express.Router();
const RegisterModel = require("../modules/registerModel");
const ProductModel = require("../modules/productModel");

//admin get all-customers details
router.get("/all-customers", async (req, res) => {
  try {
    console.log("All customers details request by admin:", req.body);
    // Await the find customers
    const allCustomers = await RegisterModel.find();
    // Respond with the list of customers
    res.status(200).json({ All_Customers_Details: allCustomers });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//admin get all products details
router.get("/all-products", async (req, res) => {
  try {
    console.log("All products details request by admin:", req.body);
    // Await the find products
    const allProducts = await ProductModel.find();
    // Respond with the list of products
    res
      .status(200)
      .json({
        Total_Products: allProducts.length,
        All_Products_Details: allProducts,
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//admin get single product by product id
router.get("/product/:id", async (req, res) => {
  try {
    console.log("product detail request by admin:", req.body);
    // Await the find products
    const product = await ProductModel.findOne({ productId: req.params.id });
    // Respond with the list of products
    res.status(200).json({ Product_Detail: product });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
