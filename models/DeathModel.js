const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DeathSchema = new Schema({
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
    deathDate: {
        type: Date,
    },
    age: {
        type: Number,
    },
    causeOfDeath: {
        type: String,
    },
    burialDate: {
        type: Date,
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
    romanCemetary: {
        type: String,
    },
    municipalCemetary: {
        type: String,
    },
    privateCemetary: {
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

module.exports = mongoose.model('Death', DeathSchema)