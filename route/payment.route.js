const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment.controller");


router.post("/create", paymentController.createPayment);
router.get("/getall", paymentController.getAllPayments);
router.get("/get/:id", paymentController.getPayment);
router.put("/update/:id", paymentController.updatePayment);
router.delete("/delete/:id", paymentController.softDeletePayment);
router.post("/restore/:id", paymentController.restorePayment);
router.get("/delete", paymentController.getDeletedPayments);


// Permanent  delete allow admin
// router.delete("/hard-delete/:id", paymentController.hardDeletePayment);

module.exports = router;