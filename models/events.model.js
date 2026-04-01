const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  eventType: { type: String, enum: ["Haldi", "Mehendi", "Wedding", "Reception", "Other"], required: true },
  eventDate: { type: Date, required: true },
  startTime: { type: String }, 
  endTime: { type: String },   
  venue: { type: String },     
  notes: [{ type: String }],   
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// EventSchema.pre("save", function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Event = mongoose.model("Event", EventSchema);

module.exports =  Event
