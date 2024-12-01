const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubscriptionSchema = new Schema({
    chapel: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
        required: true
    },
    subscriptionPlan: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
    },
    status: {
        type: Boolean,
        required: true
    },
    request: {
        type: String,
    },
    image: {
        type: String,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Subscription', SubscriptionSchema)