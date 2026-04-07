
const express = require("express");
const router = express.Router();
const leadController = require("../controller/lead.controller");
const Auth = require("../middleware/Auth");


router.get("/search", leadController.searchLeadscont);
router.post("/create", Auth, leadController.createLead);
router.get("/getall", leadController.getLeads);
router.get("/get/:id", leadController.getLead);
router.put("/update/:id", Auth, leadController.updatedLead);
router.delete("/:id", Auth, leadController.deleteLead);

router.post("/:id/followup", Auth, leadController.addFollowUp);

router.put("/restore/:id", Auth, leadController.restoreLead);

module.exports = router;