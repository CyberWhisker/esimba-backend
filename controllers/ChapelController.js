const Model = require('../models/ChapelModel')
const mongoose = require('mongoose')

const getData = async (req, res) => {
    try {
        const data = await Model.find({}).sort({createdAt: -1})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

module.exports = {
    getData,
}