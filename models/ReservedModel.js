const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReservedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    parish: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
        default: 'Pending',
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Reserved', ReservedSchema)