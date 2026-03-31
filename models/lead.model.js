const mongoose = require("mongoose");

const FollowupSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true,
        trim: true
    },
    followUpDate: {
        type: Date,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false });


const LeadSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Please use a valid phone number"],
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    weddingDate: {
        type: Date,
        index: true
    },
    location: {
        type: String,
        trim: true,
        index: true
    },
    budget: {
        type: String
    },
    guestCount: {
        type: Number,
        min: 0
    },
    source: {
        type: String,
        enum: ["Instagram", "Website", "Referral", "Ads", "Other"],
        default: "Other",
        index: true
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Proposal Sent", "Negotiation", "Confirmed", "Lost"],
        default: "New",
        index: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    isDeleted: {
        type:Boolean,
        default: false,
        index: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
    followUps: [FollowupSchema],

}, {
    timestamps: true
});

LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ assignedTo: 1, status: 1 });

LeadSchema.index({ phone: 1, email: 1 });


const Lead = mongoose.model("Lead", LeadSchema)

module.exports = Lead;