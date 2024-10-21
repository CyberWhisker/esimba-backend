const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChapelSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    chapel: {
        type: String,
        required: true,
        unique: true
    },
    address : {
        type: String,
        required: true
    },
    code : {
        type: Number,
        required: true
    },
}, { timestamps: true})

module.exports = mongoose.model('Chapel', ChapelSchema)