
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  booking: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
       required: true
     },
  amount: {
     type: Number,
      required: true 
    },
  paymentDate: { 
    type: Date,
     default: Date.now
  },
  paymentMode: { 
    type: String,
     enum: ["UPI", "Bank Transfer", "Cash", "Card", "Other"],
      default: "Other"
     },

      transactionId: {
      type: String, 
    },
  status: {
     type: String,
  enum: ["Paid", "Pending", "Overdue"],
   default: "Pending" 
  },
  notes: {
    type: String,
  },
},{timestamps: true});

PaymentSchema.index({booking: 1});
PaymentSchema.index({paymentDate: 1});
PaymentSchema.index({status: 1});
PaymentSchema.index({transactionId: 1, booking: 1}, {unique: true});



const Payment =  mongoose.model("Payment", PaymentSchema);

module.exports = Payment
