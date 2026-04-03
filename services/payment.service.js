const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");

const createPayment = async (data) => {
    const payment = await Payment.create(data);

    const payments = await Payment.find({booking: data.booking});

    const totalPaid = payments.reduce((sum , p) => sum + p.amount,0);

    const booking = await Booking.findById(data.booking);

    if(booking){
        if(totalPaid === 0){
            booking.paymentStatus = "Pending";
        } else if( totalPaid < booking.totalPrice){
            booking.paymentStatus = "Partial";
        } else {
            booking.paymentStatus = "Paid";
        }

        await booking.save();
    }

    return payment;
};


const getAllPayments = async() =>{
    return await Payment.find()
    .populate({
        path: "booking",
        populate: ["lead", "package"]
    })
    .sort({createdAt: -1});
};


const getPaymentById = async(id) => {
    return await Payment.findById(id).populate({
        path: "booking",
        populate: ["lead", "package"]
    });
};

const updatePayment = async(id,data) => {
    return await Payment.findByIdAndUpdate(id, data, {new: true});
}

const deletePayment = async(id) =>{
    return await Payment.findByIdAndDelete(id);
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};