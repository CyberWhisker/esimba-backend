const Model = require('../models/RequestModel')
const mongoose = require('mongoose')

const getData = async (req, res) => {
    try {
        const data = await Model.find({}).sort({createdAt: -1})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

const storeData = async (req, res) => {
    const {user, parish, type} = req.body
    const exist = await Model.findOne({user: user, parish: parish, type: type})
    if (exist) {
        return res.status(400).json({error: "Request Exist"})
    }
    try {
        const data = await Model.create({...req.body})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

const updateData = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }
    try {
        const data = await Model.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

const deleteData = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }
    try {
        const data = await Model.findOneAndDelete({_id: id})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

module.exports = {
    getData,
    storeData,
    updateData,
    deleteData
}