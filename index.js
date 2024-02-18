const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");
const billRoute = require("./routes/billRoute");
const homeRoute = require("./routes/homeRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//routes
app.use("/", userRoute); //  /register, /login,
app.use("/", adminRoute); // /all-customers, /all-products, /product/:id
app.use("/", productRoute); // /add-product, /get-product, /edit-product, /delete-product
app.use("/", billRoute); // /all-bills,  /edit-bill
app.use("/", homeRoute); // /all-bills,  /edit-bill

//server home page
app.get("/", async (req, res) => {
  try {
    res.status(200).send("Welcome to diet app.");
  } catch (error) {
    res.status(500).send({ message: "Server connection failed.", error });
  }
});

//mongoose server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongoose database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Serverlistening PORT:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Server Error.", error);
    res.status(500).send({ message: "Server connection interputed" });
  });
