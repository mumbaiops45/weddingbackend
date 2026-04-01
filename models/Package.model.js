
const mongoose = require("mongoose");


const PackageServiceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, default: 0 }
}, { _id: true });


const PackageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  basePrice: { type: Number, required: true },
  description: { type: String, trim: true },
  services: [PackageServiceSchema],
  popularityScore: { type: Number, default: 0 }, 
}, { timestamps: true }); 

module.exports = mongoose.model("Package", PackageSchema);