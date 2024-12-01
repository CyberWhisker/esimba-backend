const Model = require('../models/RequestModel')
const mongoose = require('mongoose')

const getData = async (req, res) => {
    try {
        const data = await Model.find({}).populate('user').sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAppointmentData = async (req, res) => {
    try {
        const data = await Model.find({ request: 'Appointment' }).populate('user').sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataByUserId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ user: id }).populate('user').sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAppointmentByParishId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ request: 'Appointment', parish: id }).populate('user').sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getCertificateData = async (req, res) => {
    try {
        const data = await Model.find({ request: 'Certificate' }).populate('user').sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getCertificateByParishId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ request: 'Certificate', parish: id }).populate('user').sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const storeData = async (req, res) => {
    // const {user, parish, certificate} = req.body
    // const exist = await Model.findOne({user: user, parish: parish, certificate: certificate})
    // if (exist) {
    //     return res.status(400).json({error: "Request Exist"})
    // }
    try {
        const data = await Model.create({ ...req.body })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateData = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    try {
        const data = await Model.findOneAndUpdate({ _id: id }, {
            ...req.body
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteData = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    try {
        const data = await Model.findOneAndDelete({ _id: id })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getData,
    storeData,
    updateData,
    deleteData,
    getAppointmentData,
    getCertificateData,
    getAppointmentByParishId,
    getCertificateByParishId,
    getDataByUserId
}