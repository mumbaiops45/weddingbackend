
const express = require("express");
const router = express.Router();
const leadController = require("../controller/lead.controller");



router.post("/create", leadController.createLead);
router.get("/getall", leadController.getLeads);
router.get("/get/:id", leadController.getLead);
router.put("/update/:id", leadController.updatedLead);
router.delete("/:id", leadController.deleteLead);


router.post("/:id/followup", leadController.addFollowUp);

module.exports = router;