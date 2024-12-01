const express = require('express')
const { getData, getDataByUserId, updateData, getDataById } = require('../controllers/ChapelController')
const router = express.Router();

//Get Data
router.get('/', getData)

router.get('/:id', getDataById)

router.patch('/:id', updateData)

router.get('/fetchByUserId/:id', getDataByUserId)

module.exports = router