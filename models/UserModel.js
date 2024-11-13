const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    chapel: {
        type: Schema.Types.ObjectId
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    role: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

UserSchema.statics.registerHash = async function (req) {
    const {password, email} = req
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        ...req,
        password: hash
    })
    return user
}

UserSchema.statics.loginHash = async function (email, password) {
    const user = await this.findOne({ email }).populate({
        path: 'chapel',
        model: 'Chapel',
    })

    if (!user) {
        throw Error('Invalid Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', UserSchema)