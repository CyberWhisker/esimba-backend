const Model = require('../models/PriestModel')
const mongoose = require('mongoose')

const getData = async (req, res) => {
    try {
        const data = await Model.find({}).populate('priest').sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataByParishId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.findOne({ parish: id }).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const storeData = async (req, res) => {
    console.log(req.file)
    try {
        const data = await Model.create({
            ...req.body,
            image: req.file ? req.file.filename : null
        })
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
        const data = await Model.findOneAndUpdate({ parish: id }, {
            ...req.body,
            image: req.file ? req.file.filename : null
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
    getDataByParishId
}