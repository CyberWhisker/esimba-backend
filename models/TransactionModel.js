const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
    },
    chapel: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
        required: true
    },
    item_type: {
        type: String
    },
    image: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

// Virtual field for attendances
TransactionSchema.virtual('request', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'transaction',
    justOne: true,
});

// Virtual field for attendances
TransactionSchema.virtual('reserved', {
    ref: 'Reserved',
    localField: '_id',
    foreignField: 'transaction',
    justOne: true,
});

module.exports = mongoose.model('Transaction', TransactionSchema)