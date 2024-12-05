const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PriestScheduleSchema = new Schema({
    parish: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
        required: true,
    },
    priest: {
        type: Schema.Types.ObjectId,
        ref: 'Priest',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('PriestSchedule', PriestScheduleSchema)