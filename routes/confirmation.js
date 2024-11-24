const express = require('express')
const {getData, storeData, updateData, deleteData, getDataByUserId} = require('../controllers/ConfirmationController')
const router = express.Router();

//Get Data
router.get('/', getData)

router.get('/getDataByUserId/:id', getDataByUserId)

router.post('/', storeData)

router.patch('/:id', updateData)

router.delete('/:id', deleteData)

module.exports = router