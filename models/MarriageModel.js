const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MarriageSchema = new Schema({
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
    age: {
        type: Number,
    },
    marriageDate: {
        type: String,
    },
    motherName: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    partnerName: {
        type: String,
    },
    witness1: {
        type: String,
    },
    witness2: {
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

module.exports = mongoose.model('Marriage', MarriageSchema)