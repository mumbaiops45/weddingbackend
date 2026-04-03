
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: [true, "Booking reference is required"], index: true },
  eventType: {
    type: String,
    enum: {
      values: ["Haldi", "Mehendi", "Wedding", "Reception", "Other"],
      message: "{VALUE} is not a valid event type",
    },
    required: [true, "Event type is required"],
    index: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true,
    trim: true
  },
  notes: [{ type: String, trim: true }],

  isDeleted: {
    type: Boolean,
    default: false,
    index: true
  },

  deletedAt: {
    type: Date,
    default: null
  },

}, { timestamps: true });

EventSchema.index({ eventDate: 1, isDeleted: 1 });
EventSchema.index({ booking: 1, isDeleted: 1 });
EventSchema.index({ eventType: 1, isDeleted: 1 });


const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
