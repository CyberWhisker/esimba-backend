const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventSchema = new Schema({
    parish: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
    },
    event: {
        type: String,
    },
    event_type: {
        type: String,
    },
    slot: {
        type: Number,
    },
    status: {
        type: String,
        default: "Pending"
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Event', EventSchema)