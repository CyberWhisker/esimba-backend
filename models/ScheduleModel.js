const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parish: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: 'Request',
    },
    date: {
        type: Date,
    },
    release: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Schedule', ScheduleSchema)