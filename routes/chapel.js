const express = require('express')
const {getData } = require('../controllers/ChapelController')
const router = express.Router();

//Get Data
router.get('/', getData)

module.exports = router