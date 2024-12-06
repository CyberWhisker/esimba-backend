const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parish: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
        required: true,
    },
    transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    certificateId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    certificate: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Request', RequestSchema)