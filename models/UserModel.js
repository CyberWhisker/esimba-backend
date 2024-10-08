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
    subcription : {
        type: Number
    }, 
    password: {
        type: String,
        required: true
    },
}, { timestamps: true})

UserSchema.statics.registerHash = async function(email, firstName, lastName, middleName, address, phone, password, role, subcription) {
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
        subcription,
        password: hash
    })

    return user
}

UserSchema.statics.loginHash = async function(email, password) {
    const user = await this.findOne({email})

    if(!user) {
        throw Error('Invalid Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', UserSchema)