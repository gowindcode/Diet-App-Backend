const mongoose = require("mongoose");

const homeSchema = mongoose.Schema (
    //homepage
    {
        logoURL: {type: String, required: false},
        hImg1: {type: String, required: false},
        hImg2: {type: String, required: false},
        hImg3: {type: String, required: false},
        hImg4: {type: String, required: false},
        hImg5: {type: String, required: false}
    });

    const HomeModel = mongoose.model("home", homeSchema);
    module.exports = HomeModel;