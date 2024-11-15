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
    certificate : {
        type: String,
        required: true,
    },
    request : {
        type: String,
        required: true,
    },
    purpose : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        required: true,
    },
    data : {
        type: Object,
        required: true,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Request', RequestSchema)