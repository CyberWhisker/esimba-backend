const Model = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const getUsers = async (req, res) => {
    try {
        const data = await Model.find({}).sort({createdAt: -1})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

const getUserById = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }
    try {
        const data = await Model.findOne({_id: id})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

const login = async (req, res) => {
    const {email, password} = req.body
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
                role: data.role}})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const register = async (req, res) => {
    const {email, firstName, lastName, middleName, address, phone, password} = req.body
    try {
        const user = await Model.registerHash(email, firstName, lastName, middleName, address, phone, password)
        const token = createToken(user._id)
        res.status(200).json({token, user: {_id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role}})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Delete Data
const deleteData = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }

    const data = await Model.findOneAndDelete({_id: id})

    if (!data) {
        return res.status(404).json({error: 'No record found'})
    }

    res.status(200).json({message: 'Successfully Deleted'})
}

//Update Data
const updateData = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not valid ID'})
    }

    const data = await Model.findOneAndUpdate({_id: id}, {
        ...req.body,
        image: req.file ? req.file.filename : null
    })

    if (!data) {
        return res.status(404).json({error: 'No record found'})
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