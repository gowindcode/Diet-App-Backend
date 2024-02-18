const express = require("express");
const HomeModel = require("../modules/homeModel");

//upload url
router.post('/',async(req, res) => {
    try {
         
        const uploadImage = await HomeModel({...req.body, verified: true});
        uploadImage.save();
        console.log("Image uploaded successfully.");
        res.status(200).json(uploadImage);
        if(!uploadImage) {
            console.log("Image upload failed");
            res.status(400).json("Process not completed");
        }

    } catch(error) {
        console.error("Server error");
        res.status(500).json({message: "Server connection failed"});
    }
})

module.exports = router;