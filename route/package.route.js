const express = require("express");
const router = express.Router();
const packageController = require("../controller/package.controller");


router.post("/createpack", packageController.createPackage);
router.get("/getpack", packageController.getPackages);
router.get("/:id", packageController.getPackage);
router.put("/:id", packageController.updatePackage);
router.delete("/:id", packageController.deletePackage);

module.exports = router;