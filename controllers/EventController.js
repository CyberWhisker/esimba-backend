const Model = require('../models/EventModel')
const mongoose = require('mongoose')
const moment = require('moment');

const getData = async (req, res) => {
    try {
        const data = await Model.find({})
            .populate('parish')
            .populate({
                path: 'priest',
                model: 'Priest'
            }).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataById = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    try {
        const data = await Model.findOne({ _id: id }).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataByParishId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ parish: id }).populate({
            path: 'priest',
            model: 'Priest'
        })
            .sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataByIds = async (req, res) => {
    const { date } = req.params;

    try {
        // Parse and normalize the date to UTC
        const targetDate = moment.utc(decodeURIComponent(date), 'ddd MMM DD YYYY HH:mm:ss ZZ');
        // Query the database for events where the date falls within the range
        const data = await Model.find({ _id: ['674c5d7a383bf4226ebe7d0e', '674c638bdacd25871abb4e67'] }).sort({ createdAt: -1 });
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data by date:', error.message);
        res.status(400).json({ error: error.message });
    }
};

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
    getDataByIds,
    getDataById
}