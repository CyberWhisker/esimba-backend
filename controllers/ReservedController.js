const Model = require('../models/ReservedModel')
const mongoose = require('mongoose')

const getData = async (req, res) => {
    try {
        const data = await Model.find({}).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataByUserId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ user: id })
            .sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataByEventId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ event: id }).populate('user')
            .sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataById = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.findById({ id })
            .sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataByParishId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ parish: id })
            .populate("user")
            .populate("event")
            .populate("transaction")
            .sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const storeData = async (req, res) => {
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
    getDataByParishId,
    getDataByUserId,
    getDataById,
    getDataByEventId
}