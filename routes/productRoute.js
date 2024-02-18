const express = require("express");
const router = express.Router();
const ProductModel = require("../modules/productModel");

//add a product
router.post("/add-product", async (req, res) => {
  try {
    const { productId } = req.body;

    const existsProduct = await ProductModel.findOne({
      productId: productId,
      verified: true,
    });
    if (existsProduct) {
      console.log("This product exist in our records.");
      res
        .status(400)
        .json({ message: "Product already exists", existsProduct });
    } else {
      const newProduct = new ProductModel({ ...req.body, verified: true });
      await newProduct.save();
      console.log("Product added successfully.");
      console.log("Server connection interrupted");
      res
        .status(200)
        .json({ message: "Product added successfully.", newProduct });
    }
  } catch (error) {
    console.error("Server error");
    res.status(500).json({ message: "Sever error", error });
  }
});

//add multiple products

router.post("/add-multiple-products", async (req, res) => {
  try {
    const productsToAdd = req.body;
    let allProductsAdded = true; //initially we set true, because we need to find existing products

    for (const product of productsToAdd) {
      const existsProduct = await ProductModel.findOne({
        productId: product.productId,
        verified: true,
      });

      if (existsProduct) {
        console.log(`Product ${product.productId} already exists.`);
      } else {
        const newProduct = new ProductModel({ ...product, verified: true });
        await newProduct.save();
        console.log(`Product ${product.productId} added successfully.`);
        allProductsAdded = false; // after produts find and added,now we changed to false. for stoping for loop run.
      }
    }

    if (allProductsAdded) {
      console.log("All products already exist.");
      return res.status(400).json({ message: "All products already exist." });
    }

    console.log("Products added successfully.");
    return res
      .status(200)
      .json({ message: "All products added successfully." });
  } catch (error) {
    console.error("Server error", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

//get a product
router.get("/get-product", async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await ProductModel.findOne({ productId: productId });
    if (product) {
      console.log("Product details found.");
      res.status(200).json({ message: "Product details:", product });
    } else {
      console.log("Product not found.");
      res.status(404).json({ message: "Data not found." });
    }
  } catch (error) {
    console.error("Server error");
    res.status(500).json({ message: "Sever error", error });
  }
});

//edit product or update product
router.post("/edit-product", async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { productId: req.body.productId }, // filter by productId
      req.body, // update with request body
      { new: true } // return the modified document rather than the original
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res
      .status(200)
      .json({ message: "Product updated successfully.", updatedProduct });
  } catch (error) {
    return res.status(400).json({ message: "Error updating product.", error });
  }
});

//delete product
router.post("/delete-product", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({
      productId: req.body.productId,
    });
    if (deletedProduct) {
      console.log("Product found.");
      console.log("Product deleted successfully.");
      res
        .status(200)
        .json({ message: "Product deleted successfully.", deletedProduct });
    } else {
      console.log("Products not found.");
      res.status(400).json({ message: "Products not deleted" });
    }
  } catch (error) {
    console.error("Server error");
    res.status(500).json({ message: "Sever error", error });
  }
});

module.exports = router;
