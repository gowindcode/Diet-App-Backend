const mongoose = require("mongoose");

const productSchema = mongoose.Schema (
    //product
    {
        productId: {type: Number, required: true},
        productName: {type: String, required: true},
        image: {type: String, required: true},
        description:{type: String, required: true},
        price: {type: String, required: true},
        offerPrice: {type: String, required: false},
        rating: {type: Number, required: true},
        stockQty: {type: String, required: true},
        verified: {type: Boolean, required: true},
        role: {type: String, required: true, default: "product"},
    }, {timestamps: true});

    const ProductModel = mongoose.model("product", productSchema);
    module.exports = ProductModel;