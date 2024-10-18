const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    parish: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    type : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        required: true,
    },
    active : {
        type: Boolean,
        default: true
    },
    data : {
        type: Object,
        required: true,
    },
}, { timestamps: true})

module.exports = mongoose.model('Request', RequestSchema)