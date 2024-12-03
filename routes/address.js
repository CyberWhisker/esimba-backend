const express = require('express')
const { getData } = require('../controllers/AddressController')
const router = express.Router();

//Get Data
router.get('/', getData)

module.exports = router