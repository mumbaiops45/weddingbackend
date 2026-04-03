const bookingService = require("../services/booking.service")


exports.createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const result = await bookingService.getAllBookings(req.query);
        return res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
            ...result,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Booking fetched successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await bookingService.updateBooking(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const result = await bookingService.deleteBooking(req.params.id);
        return res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

exports.confirmBooking = async (req, res) => {
    try {
        const booking = await bookingService.confirmBooking(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Booking confirmed successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

exports.rejectBooking = async (req, res) => {
    try {
        const booking = await bookingService.rejectBooking(
            req.params.id,
            req.body.reason
        );
        return res.status(200).json({
            success: true,
            message: "Booking rejected successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

exports.completeBooking = async (req, res) => {
    try {
        const booking = await bookingService.completeBookings(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Booking completed successfully",
            data: booking,
        });
    } catch (error) {

        return res.status(400).json({ success: false, message: error.message });
    }
}

exports.addVendorToBooking = async (req, res) => {
    try {
        const booking = await bookingService.addVendorToBooking(
            req.params.id,
            req.body
        );
        return res.status(200).json({
            success: true,
            message: "Vendor added to booking successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

exports.removeVendorFromBooking = async (req, res) => {
    try {
        const booking = await bookingService.removeVendorFromBooking(
            req.params.bookingId,
            req.params.vendorEntryId
        );
        return res.status(200).json({
            success: true,
            message: "Vendor removed from booking successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const booking = await bookingService.updatePaymentStatus(
            req.params.id,
            req.body.paymentStatus
        );
        return res.status(200).json({
            success: true,
            message: "Payment status updated successfully",
            data: booking,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};