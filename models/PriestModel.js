const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PriestSchema = new Schema({
    parish: {
        type: Schema.Types.ObjectId,
        ref: 'Chapel',
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('Priest', PriestSchema)