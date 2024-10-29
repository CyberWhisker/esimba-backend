const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MemberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chapel: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
        required: true
    },
    status : {
        type: Boolean,
        default: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Member', MemberSchema)