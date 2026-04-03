const Event = require("../models/events.model");
const Booking = require("../models/booking.model");

const createEvent = async (eventData) => {

    const bookingExists = await Booking.findById(eventData.booking);
    if (!bookingExists) throw new Error("Invalid Booking ID - booking not found");
    
    if (bookingExists.status === "Cancelled") {
        throw new Error("Cannot create event for a cancelled booking");
    }

    const duplicate = await Event.findOne({
        booking: eventData.booking,
        eventType: eventData.eventType,
        isDeleted: false
    });

    if (duplicate) {
        throw new Error(`Event of type "${eventData.eventData}" already exists for this booking`);
    }

    const event = await Event.create(eventData);

    return await Event.findById(event._id)
        .populate("booking", "eventDate totalPrice status lead");

};

const getAllEvents = async (query = {}) => {
    const {
        eventType,
        booking,
        page = 1,
        limit = 20,
        sortBy = "eventDate",
        order = "asc"
    } = query;

    const filter = {isDeleted: false};

    if(eventType) filter.eventType = eventType;
    if(booking)filter.booking = booking;

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const [events , total] = await Promise.all([
        Event.find(filter)
        .populate("booking", "eventDate totalPrice status lead")
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(Number(limit)),

        Event.countDocuments(filter)
    ]);

    return {
        events ,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil (total / limit)
        }
    };
};

const getEventById = async (id) =>{
    const event = await Event.findOne({_id: id, isDeleted: false})
    .populate("booking", "eventDate totalPrice status lead");

    if(!event) throw new Error("Event not found");

    return event;
};

const updateEvent = async (id, updatedData) => {
    const event = await Event.findOne({_id: id, isDeleted: false});

    if(!event) throw new Error("Event not found");

    delete updatedData.isDeleted;
    delete updatedData.deletedAt;

    const updated = await Event.findByIdAndUpdate(
        id, 
        updatedData,
        {returnDocument: "after", runValidators: true}
    ).populate("booking", "eventDate totalPrice status lead");

    return updated;
};

const deleteEvent = async (id) => {
    const event = await Event.findOne({ _id: id, isDeleted: false });
    if (!event) throw new Error("Event not found");
    if (event.isDeleted) throw new Error("Event is already deleted");

    event.isDeleted = true;
    event.deletedAt = new Date(); 
    await event.save();

    return event;
};


const restoreEvent = async (id) => {
    const event = await Event.findOne({ _id: id, isDeleted: true });
    if (!event) throw new Error("Event not found or not deleted");

    event.isDeleted = false;
    event.deletedAt = null;
    await event.save();

    return event;
};


const getDeletedEvents = async () => {
    const events = await Event.find({ isDeleted: true })
        .populate("booking", "eventDate totalPrice status lead")
        .sort({ deletedAt: -1 });

    return events;
};



module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    restoreEvent,  
    getDeletedEvents
};