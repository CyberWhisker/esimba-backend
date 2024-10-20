const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    middleName : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    phone : {
        type: Number,
        required: true
    },
    image : {
        type: String
    },
    role : {
        type: Number
    }, 
    password: {
        type: String,
        required: true
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

UserSchema.statics.registerHash = async function(email, firstName, lastName, middleName, address, phone, password, role) {
    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email already in use')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        email,
        firstName,
        lastName,
        address,
        phone,
        middleName,
        role,
        password: hash
    })

    return user
}

UserSchema.statics.loginHash = async function(email, password) {
    const user = await this.findOne({email}).populate({
        path: 'chapel',
        model: 'Chapel',
    })

    if(!user) {
        throw Error('Invalid Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

// Virtual field
UserSchema.virtual('chapel', {
    ref: 'Chapel',
    localField: '_id',
    foreignField: 'user',
});

module.exports = mongoose.model('User', UserSchema)