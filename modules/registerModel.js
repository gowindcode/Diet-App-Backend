const mongoose = require("mongoose");

const registerSchema = mongoose.Schema (
    //homepage
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        password:{type: String, required: true},
        mobile: {type: Number, required: true},
        address: {type: String, required: true},
        dietFor: {type: String, required: true},
        verified: {type: Boolean, required: true},
        role: {type: String, required: true, default: "user", enum:["user", "admin"]},
    }, {timestamps: true});

    const RegisterModel = mongoose.model("signup", registerSchema);
    module.exports = RegisterModel;