const express = require('express')
const multer  = require('multer')
const {login, register, getUsers, getUserById, deleteData, updateData} = require('../controllers/UserController')
const router = express.Router();

//User Login
router.post('/login', login)

//User Registration
router.post('/register', register)

//Get All Users
router.get('/', getUsers)

//Get User
router.get('/:id', getUserById)

//Delete User
router.delete('/:id', deleteData)

//Update User
router.patch('/:id', updateData)

module.exports = router