const express = require("express");
const router = express.Router();
const vendorController = require("../controller/vendor.controller");

router.post("/create", vendorController.createVendor);
router.get("/getall", vendorController.getAllVendors);
router.get("/get/:id", vendorController.getVendorById);
router.put("/update/:id", vendorController.updateVendor);
router.delete("/delete/:id", vendorController.deleteVendor);


module.exports = router;