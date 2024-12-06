const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PriceSchema = new Schema({
    item: {
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Price', PriceSchema)