const express = require('express')
const {getData, storeData, updateData, deleteData, getDataByParishId, getDataByUserId, getDataByDate} = require('../controllers/ScheduleController')
const router = express.Router();

//Get Data
router.get('/', getData)
router.get('/getDataByDate/:id', getDataByDate)
router.get('/getDataByParishId/:id', getDataByParishId)
router.get('/getDataByUserId/:id', getDataByUserId)
router.post('/', storeData)
router.patch('/:id', updateData)
router.delete('/:id', deleteData)

module.exports = router