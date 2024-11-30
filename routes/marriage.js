const express = require('express')
const {getData, storeData, updateData, deleteData, getDataByUserId, getDataByChapelId} = require('../controllers/MarriageController')
const router = express.Router();

//Get Data
router.get('/', getData)

router.get('/getDataByUserId/:id', getDataByUserId)

router.get('/getDataByChapelId/:id', getDataByChapelId)

router.post('/', storeData)

router.patch('/:id', updateData)

router.delete('/:id', deleteData)

module.exports = router