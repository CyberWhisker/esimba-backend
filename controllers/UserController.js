const Model = require('../models/UserModel')
const ChapelModel = require('../models/ChapelModel')
const SubscriptionModel = require('../models/SubscriptionModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const moment = require('moment')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const getUsers = async (req, res) => {
    try {
        const data = await Model.find({}).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    try {
        const data = await Model.findOne({ _id: id })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await Model.loginHash(email, password)
        const token = createToken(data._id)
        res.status(200).json({
            token,
            user: {
                _id: data._id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                parish: data.chapel,
                role: data.role
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const register = async (req, res) => {
    const { role, subscription, chapelName, chapelAddress, code, email } = req.body
    let chapelId;
    let newFormData = {};
    try {
        if (role == 2) {
            const chapelExist = await ChapelModel.findOne({ chapel: chapelName })
            const emailExist = await Model.findOne({ email: email })
            if (chapelExist || emailExist) {
                throw Error('Chapel already in use')
            }
            const chapel = await ChapelModel.create({
                chapel: chapelName,
                address: chapelAddress,
                code: code
            })
            chapelId = chapel._id
            if (subscription == 1) {
                await SubscriptionModel.create({
                    chapel: chapel._id,
                    subscriptionPlan: subscription,
                    startDate: moment(),
                    endDate: moment().add(1, 'M'),
                    amount: 100,
                    status: true
                })
            }
            if (subscription == 2) {
                await SubscriptionModel.create({
                    chapel: chapel._id,
                    subscriptionPlan: subscription,
                    startDate: moment(),
                    endDate: moment().add(3, 'M'),
                    amount: 0,
                    status: true
                })
            }
        }
        if (chapelId) {
            newFormData = {
                ...req.body,
                chapel: chapelId
            }
        } else {
            newFormData = {
                ...req.body
            }
        }
        const user = await Model.registerHash(newFormData)
        const token = createToken(user._id)
        const userData = await Model.findOne({ _id: user._id }).populate({
            path: 'chapel',
            model: 'Chapel',
        })
        res.status(200).json({
            token,
            user: {
                _id: userData._id,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                middleName: userData.middleName,
                parish: userData.chapel,
                role: userData.role
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Delete Data
const deleteData = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOneAndDelete({ _id: id })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json({ message: 'Successfully Deleted' })
}

//Update Data
const updateData = async (req, res) => {
    let newPassword
    const { id } = req.params
    const { resetPassword, password } = req.body
    if (resetPassword) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(resetPassword, salt)
        newPassword = hash
    } else {
        newPassword = password
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOneAndUpdate({ _id: id }, {
        ...req.body,
        password: newPassword
    })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(req.body)
}

module.exports = {
    login,
    register,
    getUsers,
    getUserById,
    updateData,
    deleteData,
}