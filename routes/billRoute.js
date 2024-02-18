const express = require("express");
const router = express.Router();
const RegisterModel = require("../modules/registerModel");
const ProductModel = require("../modules/productModel");
const UserModel = require("../modules/userModel");
const BillModel = require("../modules/billModel");

//create bill
router.post('/create-bill', async (req, res) => {
    try{
        // console.log("create bill", req.body)
        const newBill = new BillModel(req.body)
        await newBill.save()
        res.send('Bill generated and saved successfully.')

    } catch(error) {
        res.status(400).json(error)
    }
     
})

//admin edit-bill details
router.post('/edit-bill', async (req, res) => {
    try {
        console.log("Bill overwrite or update request by admin:", req.body);
        // Await the find products
        const bill = await BillModel.findOneAndUpdate(); 
        bill.save();
        console.log("Bill updated successfully.");
        // Respond with the list of products
        res.status(200).json({Edited_Bill_Details: bill}); 
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//get bill using mobile number
router.get('/get-bill', async (req, res) => {
    try{
        const bills = await BillModel.find()
        res.send(bills)

    } catch(error) {
        res.status(400).json(error)
    }
     
})

//admin get all-bills details
router.get('/all-bills', async (req, res) => {
    try {
        console.log("All bill details request by admin:", req.body);
        // Await the find bills
        const allBills = await BillModel.find(); 
        // Respond with the list of bills
        res.status(200).json({All_Bill_Details: allBills}); 
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;