const express = require("express");
const router = express.Router();
const UserModel = require("../modules/userModel");
const RegisterModel = require("../modules/registerModel");


//user-signup or regiser

router.post("/signup", async (req, res) => {
    try {
      console.log("user-signup", req.body);
      const existingUser = await RegisterModel.findOne(
        {email: req.body.email} && {mobile: req.body.mobile}
      );
  
      if (existingUser) {

        console.log("Email already used:", req.body.email);
        console.log("Mobile Number already used:", req.body.mobile);
        res.send({ message: "User already exists."});
      } else {
        const newUser = new RegisterModel({...req.body, verified: true});
        console.log("Login request received, please wait we are validating...");
        await newUser.save();
        console.log("Signup successful.");
        res.send({ message: "Signup successful.", newUser });
      }
    } catch (error) {
      console.error("Signup failed:", error);
      res.send({ message: "Signup failed, Please enter correct details." });
      res.status(500).json({ message: "Server error", error });
    }
  });

//user-login

router.post('/login', async(req, res) => {
    try {
        console.log("user-login:", req.body);
        
        const { email, password } = req.body;

        // Find the user based on the provided email
        const loginRequest = await RegisterModel.findOne({ email });

        // If user doesn't exist or password is incorrect, return an error
        if (!loginRequest || loginRequest.password !== password) {
            console.log("Invalid email or password");
            return res.status(401).json({ message: "Invalid email or password" });
        } else {
            const user = new UserModel({...req.body, verified: true});
            await user.save()
            res.status(200).json({ message: "Login successful" });
        }

        // If user exists and password is correct, return a success message "Login successful"
        
    } catch (error) {
        console.error("User login failed", error);
        res.status(500).json({ message: "Server error" });
    }
});

//user-details



module.exports = router;