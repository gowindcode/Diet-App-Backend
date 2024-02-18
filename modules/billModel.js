const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  //bill
  {
    billId: { type: Number, required: true },
    productName: { type: String, required: false, default: null },
    image: { type: String, required: false, default: null },
    description: { type: String, required: false, default: null },
    price: { type: Number, required: false, default: null },
    qty: { type: Number, required: false, default: null },
    totalQty: { type: Number, required: false, default: null },
    tax: { type: Number, required: false, default: null },
    totalAmount: { type: Number, required: false, default: null },
    paymentType: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

const BillModel = mongoose.model("bill", billSchema);
module.exports = BillModel;
