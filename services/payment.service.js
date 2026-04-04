const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");

const createPayment = async (data) => {
    const bookings = await Booking.findById(data.booking);
    if (!bookings) {
        throw new Error("Invalid booking ID. Booking not found.");
    }

    if (data.transactionId) {
        const existingTxn = await Payment.findOne({
            transactionId: data.transactionId,
            isDeleted: false
        });
        if (existingTxn) {
            throw new Error("Transaction ID must be unique.");
        }
    }

    const payment = await Payment.create(data);

    const payments = await Payment.find({ booking: data.booking, isDeleted: false });

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    const booking = await Booking.findById(data.booking);

    if (booking) {
        if (totalPaid === 0) {
            booking.paymentStatus = "Pending";
        } else if (totalPaid < booking.totalPrice) {
            booking.paymentStatus = "Partial";
        } else {
            booking.paymentStatus = "Paid";
        }

        await booking.save();
    }

    return payment;
};


const getAllPayments = async () => {
    return await Payment.find({ isDeleted: false })
        .populate({
            path: "booking",
            populate: ["lead", "package"]
        })
        .sort({ createdAt: -1 });
};


const getPaymentById = async (id) => {
    return await Payment.findOne({ _id: id, isDeleted: false })
        .populate({
            path: "booking",
            populate: ["lead", "package"]
        });

};



const updatePayment = async (id, data) => {
    const existingPayment = await Payment.findOne({_id:id , isDeleted: false});

    if(!existingPayment){
        throw new Error("Payment not found or has been deleted");
    }

    if(data.transactionId && data.transactionId !== existingPayment.transactionId) {
        const existingTxn = await Payment.findOne({
            transactionId: data.transactionId,
            isDeleted: false,
            _id: {$ne: id}
        });

        if(existingTxn){
            throw new Error("Transaction ID must be unique.");
        }
    }

    return await Payment.findByIdAndUpdate(id, data, {new: true});
};


const softDeletePayment = async (id) => {

    const payment = await Payment.findOne({_id: id});

    if(!payment){
        throw new Error("Payment not found");
    }
    
    if(payment.isDeleted === true){
        throw new Error("Payment is already deleted");
    }

     const deletedPayment = await Payment.findByIdAndUpdate(id,
        {
            isDeleted: true,
            deletedAt: new Date()
        },
        {new : true}
     );

     const payments = await Payment.find({
        booking: deletedPayment.booking,
        isDeleted: false
     });
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    const booking = await Booking.findById(payment.booking);
    if (booking) {
        if (totalPaid === 0) {
            booking.paymentStatus = "Pending";
        } else if (totalPaid < booking.totalPrice) {
            booking.paymentStatus = "Partial";
        } else {
            booking.paymentStatus = "Paid";
        }
        await booking.save();
    }

    return payment;
}



const restorePayment = async(id) => {
    const payment = await Payment.findOne({_id: id});

    if(!payment){
        throw new Error("Payment not found");
    }

    if(payment.isDeleted === false){
        throw new Error("Payment is already active");
    }

    const restoredPayment = await Payment.findByIdAndUpdate(id, {
        isDeleted: false,
        deleteAt: null
    },
    {new: true}
);

const payments = await Payment.find({
    booking: restoredPayment.booking,
    isDeleted: false
});

    const totalPaid = payments.reduce((sum , p) => sum + p.amount, 0);

    const booking = await Booking.findById(restoredPayment.booking);
    if(booking){
        if(totalPaid === 0){
            booking.paymentStatus = "Pending";
        } else if (totalPaid < booking.totalPrice){
            booking.paymentStatus = "Partial";
        } else {
            booking.paymentStatus = "Paid";
        }
        await booking.save();
    }
    return payment; 
}

const getDeletedPayments = async () => {
    return await Payment.find({isDeleted: true})
    .populate({
        path: "booking",
        populate: ["lead", "package"]
    })
    .sort({deletedAt: -1});
};


const hardDeletePayment = async (id) =>{
    const payment = await Payment.findOne({_id: id, isDeleted: true});
    if(!payment){
        throw new Error("Payment not found or not soft-deleted first");
    }

    return await Payment.findByIdAndDelete(id);
}

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    softDeletePayment,
    restorePayment,
    getDeletedPayments,
    hardDeletePayment
};