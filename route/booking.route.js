const express = require("express");
const router = express.Router();
const bookingController = require("../controller/booking.controller");
const Auth = require("../middleware/Auth");


router.get("/booking/getall", bookingController.getAllBookings);
router.get("/booking/get/:id", bookingController.getBookingById);
router.post("/booking/create", Auth, bookingController.createBooking);
router.put("/booking/update/:id", Auth, bookingController.updateBooking);
router.delete("/booking/delete/:id", Auth, bookingController.deleteBooking);
router.put("/booking/confirm/:id", Auth, bookingController.confirmBooking);
router.put("/booking/reject/:id", Auth, bookingController.rejectBooking);
router.put("/booking/complete/:id", Auth, bookingController.completeBooking); 
router.post("/booking/:id/vendor", Auth, bookingController.addVendorToBooking);
router.delete("/booking/:bookingId/vendor/:vendorEntryId", Auth, bookingController.removeVendorFromBooking);
router.put("/booking/payment/:id", Auth, bookingController.updatePaymentStatus);

module.exports = router;