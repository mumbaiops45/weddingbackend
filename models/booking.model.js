const mongoose = require('mongoose');

const BookingVendorSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    assignedRole: {
        type: String,
        trim: true
    },
}, { _id: true , timestamps: true });

const BookingSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true,
        index: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true,
        index: true
    },
    eventDate: {
        type: Date,
        required: true,
        index: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: { 
    type: String,
    enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
    index: true
  },
  paymentStatus: { 
    type: String,
    enum: ["Pending", "Partial", "Paid", "Overdue"],
    default: "Pending",
    index: true
  },

  confirmedAt: {
    type: Date,
    default: null
  },
  rejectedAt: {
    type: Date,
    default: null
  },

  paidAmount: {
    type: Number,
    default: 0,
    min: 0
  },

  vendors: [BookingVendorSchema],
  notes: [{
    type: String , 
    trim : true
 }],
},  { timestamps: true });


BookingSchema.index({ status: 1, createdAt: -1});
BookingSchema.index({lead: 1, status: 1});
BookingSchema.index({paymentStatus:1, status: 1});
BookingSchema.index({eventDate: 1, status: 1});


const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;