const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChapelSchema = new Schema({
    chapel: {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true
    },
    code : {
        type: Number,
        required: true
    },
    gcash : {
        type: Number,
    },
}, { timestamps: true})

module.exports = mongoose.model('Chapel', ChapelSchema)