const Model = require('../models/PriceModel')
const mongoose = require('mongoose')

const getData = async (req, res) => {
    try {
        const data = await Model.find({}).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataById = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ _id: id }).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataByItem = async (req, res) => {
    const { item } = req.params
    try {
        const data = await Model.find({ item: item }).sort({ createdAt: -1 })
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
    getDataById,
    getDataByItem,
    storeData,
    updateData,
    deleteData,
}