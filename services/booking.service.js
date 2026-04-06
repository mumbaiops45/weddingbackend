const Booking = require("../models/booking.model");
const Lead = require("../models/lead.model");     
const Package = require("../models/Package.model"); 
const Vendor = require("../models/vendor.model");


const createBooking = async (data) => {
    const { lead, package: packageId , vendors  } = data;

    const leadExists = await Lead.findById(lead);
    if (!leadExists) {
        throw new Error("Invalid Lead ID");
    }
    const packageExists = await Package.findById(packageId);
    if (!packageExists) {
        throw new Error("Invalid Package ID");
    }
    const existingBooking = await Booking.findOne({
        lead: lead,
        package: packageId
    });
    if (existingBooking) {
        throw new Error("Booking already exists for this lead and package");
    }

    if (vendors && vendors.length > 0) {
        for (const v of vendors) {
            const vendorExists = await Vendor.findById(v.vendor);
            if(!vendorExists){
                throw new Error(`Invalid Vendor ID: ${v.vendor}`);
            }
        }
    }
    
    const booking = await Booking.create(data);

    return await Booking.findById(booking._id)
        .populate("lead", "clientName email phone")
        .populate("package", "name price")
        .populate("vendors.vendor", "name serviceType phone email location priceRange");
};

const getAllBookings = async (query = {}) => {
    const {
        status,
        paymentStatus,
        page = 1,
        limit = 20,
        sortBy = "createdAt",
        order = "desc"
    } = query;

    const filter = {};
    if(status) filter.status =  status;
    if(paymentStatus) filter.paymentStatus = paymentStatus;

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const [bookings , total] = await Promise.all([
        Booking.find(filter)
        .populate("lead", "clientName email phone")
        .populate("package", "name price")
        .populate("vendors.vendor" , "name serviceType phone email location priceRange")
        .sort({ [sortBy] : sortOrder})
        .skip(skip)
        .limit(Number(limit)),
        Booking.countDocuments(filter)
    ]);

    return {
        bookings,
        pagination: {
            total , 
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getBookingById = async (id) => {
    const booking = await Booking.findById(id)
    .populate("lead", "clientName email phone")
    .populate("package", "name price")
    .populate("vendors.vendor", "name serviceType phone email location priceRange");

    if(!booking) throw new Error("Booking not found");
    return booking;
};


const updateBooking = async (id , data) => {
    const booking = await Booking.findById(id);

    if(!booking) throw new Error("Booking not found");

    delete data.status;

    const updated = await Booking.findByIdAndUpdate(
        id,
        data,
        {new: true, runValidators: true}
    )
    .populate("lead", "CLientName email phone")
    .populate("package" ,  "name price")
    .populate("vendors.vendor", "name serviceType phone email location priceRange");

    return updated;
};


const deleteBooking = async (id) => {
    const booking = await Booking.findById(id);
    if(!booking) throw new Error("Booking not found");

    if(booking.status === "Confirmed" || booking.status === "In Progress"){
        throw new Error("Cannot delete a confirmed or in-progress booking");
    }

    await Booking.findByIdAndDelete(id);
    return {
        message: "Booking deleted successfully"
    };
};


const confirmBooking = async (id) => {
    const booking = await Booking.findById(id);
    if(!booking) throw new Error("Booking not found");
    if(booking.status === "Confirmed") throw new Error("Booking is alredy confirmed");
    if(booking.status === "Cancelled") throw new Error("Cancelled booking cannot be confirmed");

    booking.status = "Confirmed";
    booking.confirmedAt = new Date();
    booking.rejectionReason = null;
    booking.rejectedAt = null;
    await booking.save();

    return await Booking.findById(id)
     .populate("lead", "clientName email phone")
     .populate("package", "name price")
     .populate("vendors.vendor", "name serviceType phone email location priceRange");
};

const rejectBooking = async (id, reason) => {
    const booking = await Booking.findById(id);
    if(!booking) throw new Error("Booking not found");
    if(booking.status === "Cancelled") throw new Error("Booking is already candelled");
    if(booking.status ===  "Completed") throw new Error("Completed booking cannot be cancelled");

    booking.status = "Cancelled";
    booking.rejectionReason = reason || " No reason provided";
    booking.rejectedAt = new Date();
    booking.confirmedAt = null;
    await booking.save();

    return await  Booking.findById(id)
      .populate("lead" , "clientName email phone")
      .populate("package", "name price")
      .populate("vendors.vendor" , "name serviceType phone email location priceRange");
};

const completeBookings = async (id) =>{
    const booking = await Booking.findById(id);
    if(!booking) throw new Error("Booking not found");

    if(booking.status === "Completed"){
        throw new Error("Booking is already completed");
    }

    if(booking.status === "Cancelled") {
        throw new Error("Cancelled booking cannot be completed");
    }

    // if(booking.status === "Pending"){
    //     throw new Error("Pending booking cannot be completed - confirm it first");
    // }

    if(booking.paymentStatus !== "Paid"){
        throw new Error("Booking cannot be completed - payment is not fully paid");
    }

    booking.status = "Completed";
    booking.completedAt = new Date();
    await booking.save();

    return await Booking.findById(id)

    .populate("lead", "clientName email phone")
    .populate("package", "name price")
    .populate("vendors.vendor", "name serviceType phone email location priceRange");

}

const addVendorToBooking = async(id , vendorData) => {
    const booking = await Booking.findById(id);
    if(!booking) throw new Error("Booking not found");

    const alreadyExists = booking.vendors.some(
        (v) => v.vendor.toString() === vendorData.vendor
    );

    if(alreadyExists) throw new Error("Vendor already added to this booking");

    booking.vendors.push(vendorData);
    await booking.save();

    return await Booking.findById(id)
    .populate("lead", "clientName email phone")
    .populate("package", "name price")
    .populate("vendors.vendor", "name serviceType phone email location priceRange");
} 

const removeVendorFromBooking = async (bookingId, vendorEntryId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new Error("Booking not found");

    const vendorExists = booking.vendors.some(
        (v) => v._id.toString() === vendorEntryId
    );
    if (!vendorExists) throw new Error("Vendor entry not found in this booking");

    booking.vendors = booking.vendors.filter(
        (v) => v._id.toString() !== vendorEntryId
    );
    await booking.save();

    return await Booking.findById(bookingId)
        .populate("lead", "clientName email phone")
        .populate("package", "name price")
        .populate("vendors.vendor", "name serviceType phone email location priceRange");
};

const updatePaymentStatus = async (id, paymentStatus) => {
    const validStatuses = ["Pending", "Partial", "Paid", "Overdue"];
    if (!validStatuses.includes(paymentStatus)) {
        throw new Error(`Invalid payment status. Must be one of: ${validStatuses.join(", ")}`);
    }

    const booking = await Booking.findById(id);
    if (!booking) throw new Error("Booking not found");

    booking.paymentStatus = paymentStatus;
    await booking.save();

    return await Booking.findById(id)
        .populate("lead", "clientName email phone")
        .populate("package", "name price")
        .populate("vendors.vendor", "name serviceType phone email location priceRange");
};



module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    confirmBooking,
    rejectBooking,
    rejectBooking,
    completeBookings,
    addVendorToBooking,
    removeVendorFromBooking,
    updatePaymentStatus,
};