const express = require("express");
const router = express.Router();
const vendorController = require("../controller/vendor.controller");

router.post("/vendorcreate", vendorController.createVendor);
router.get("/getvendor", vendorController.getAllVendors);


module.exports = router;