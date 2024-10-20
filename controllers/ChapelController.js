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

const getDataByUserId = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }

    try {
        const data = await Model.find({user: id}).sort({createdAt: -1})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

module.exports = {
    getData,
    getDataByUserId
}