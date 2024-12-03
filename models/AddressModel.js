const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Address Schema
const AddressSchema = new Schema({
    city: {
        type: String,
    },
    zip: {
        type: Number,
    },
    barangays: {
        type: Array,
    },
}, { timestamps: true });

// Create and export the Address model
module.exports = mongoose.model('Address', AddressSchema);
