const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        enum: ["Photographer", "Caterer", "Decorator" , "Travel", "Other"],
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    priceRange: {
        type: String
    },
    location: {
        type: String
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


// VendorSchema.pre("save", function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Vendor = mongoose.model("Vendor", VendorSchema);
module.exports = Vendor;