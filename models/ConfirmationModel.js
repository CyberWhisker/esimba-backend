const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ConfirmationSchema = new Schema({
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
    birthDate : {
        type: Date,
    },
    birthAddress : {
        type: String,
    },
    baptismDate : {
        type: Date,
    },
    baptismAddress : {
        type: String,
    },
    motherName : {
        type: String,
    },
    fatherName : {
        type: String,
    },
    sponsor1 : {
        type: String,
    },
    sponsor2 : {
        type: String,
    },
    priest : {
        type: String,
    },
}, { timestamps: true})

module.exports = mongoose.model('Confirmation', ConfirmationSchema)