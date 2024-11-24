const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    request : {
        type: Schema.Types.ObjectId,
        ref: 'Request',
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
    // status : {
    //     type: String,
    //     required: true
    // },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Transaction', TransactionSchema)