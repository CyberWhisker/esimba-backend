const express = require('express')
const {getData, getDataByUserId } = require('../controllers/ChapelController')
const router = express.Router();

//Get Data
router.get('/', getData)

router.get('/fetchByUserId/:id', getDataByUserId)

module.exports = router