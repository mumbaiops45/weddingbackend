const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    },
    refreshToken: {
        type: String
    },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
module.exports = User;