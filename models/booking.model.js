const mongoose = require('mongoose');

const BookingVendorSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    assignedRole: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BookingSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: { 
    type: String,
    enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
    default: "Pending"
  },
  paymentStatus: { 
    type: String,
    enum: ["Pending", "Partial", "Paid", "Overdue"],
    default: "Pending"
  },

  vendors: [BookingVendorSchema],
  notes: [{type: String}],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


// BookingSchema.pre("save", function(next) {
//   this.updatedAt = Date.now();
//   next();
// });


const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;