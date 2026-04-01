
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMode: { type: String, enum: ["UPI", "Bank Transfer", "Cash", "Card", "Other"], default: "Other" },
  status: { type: String, enum: ["Paid", "Pending", "Overdue"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// PaymentSchema.pre("save", function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Payment =  mongoose.model("Payment", PaymentSchema);

module.exports = Payment
