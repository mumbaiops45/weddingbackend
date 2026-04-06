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
    
}, {timestamps: true});




const Vendor = mongoose.model("Vendor", VendorSchema);
module.exports = Vendor;