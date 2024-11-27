const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DonationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chapel : {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
        required: true
    },
    image : {
        type: String,
    },
    amount : {
        type: Number,
        required: true
    },
    status : {
        type: String,
        default: "Pending"
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Donation', DonationSchema)