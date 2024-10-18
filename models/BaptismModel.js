const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BaptismSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    chapel: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    firstName : {
        type: String,
    },
    middleName : {
        type: String,
    },
    lastName : {
        type: String,
    },
    birthDay : {
        type: Date,
    },
    birthAddress : {
        type: Date,
    },
    baptismDate : {
        type: Date,
    },
    code : {
        type: Number,
        required: true
    },
}, { timestamps: true})

module.exports = mongoose.model('Baptism', BaptismSchema)