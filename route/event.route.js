const express = require("express");
const eventController = require("../controller/event.controller");
const Auth = require("../middleware/Auth");
const router = express.Router();


router.get("/getall", eventController.getAllEvents);
router.get("/get/:id", eventController.getEventById);
router.get("/deleted", eventController.getDeletedEvents); 
router.post("/create", Auth, eventController.createEvent);
router.put("/update/:id", Auth, eventController.updateEvent);
router.delete("/delete/:id", Auth, eventController.deleteEvent);
router.put("/restore/:id", Auth, eventController.restoreEvent); 

module.exports = router;