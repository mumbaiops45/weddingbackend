const eventService = require("../services/event.service");


exports.createEvent = async (req, res) => {
    try {
        const event = await eventService.createEvent(req.body);
        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getAllEvents = async (req, res) => {
    try {
        const result = await eventService.getAllEvents(req.query);
        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getEventById = async (req, res) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        return res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


exports.updateEvent = async (req, res) => {
    try {
        const event = await eventService.updateEvent(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: event,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


exports.deleteEvent = async (req, res) => {
    try {
        await eventService.deleteEvent(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


exports.restoreEvent = async (req, res) => {
    try {
        const event = await eventService.restoreEvent(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Event restored successfully",
            data: event,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getDeletedEvents = async (req, res) => {
    try {
        const events = await eventService.getDeletedEvents();
        return res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};