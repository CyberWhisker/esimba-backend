const mongoose = require("mongoose");

const RequirementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reserve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reserve",
    },
    data: {
        type: Object
    }, // Optional field for additional files
    createdAt: {
        type: Date, default: Date.now
    },
});

const Requirement = mongoose.model("Requirement", RequirementSchema);

module.exports = Requirement;
