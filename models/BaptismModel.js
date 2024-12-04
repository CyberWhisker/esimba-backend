const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BaptismSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chapel: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
        required: true,
    },
    name: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    birthAddress: {
        type: String,
    },
    baptismDate: {
        type: Date,
    },
    baptismAddress: {
        type: String,
    },
    motherName: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    sponsor1: {
        type: String,
    },
    sponsor2: {
        type: String,
    },
    purpose: {
        type: String,
    },
    priest: {
        type: String,
    },
    status: {
        type: String,
        default: 'Hold'
    }
}, { timestamps: true })

module.exports = mongoose.model('Baptism', BaptismSchema)