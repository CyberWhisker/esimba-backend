const express = require('express')
const {getData, storeData, updateData, deleteData, getDataByParishId, getDataByIds } = require('../controllers/EventController')
const router = express.Router();

//Get Data
router.get('/', getData)
router.get('/getDataByParishId/:id', getDataByParishId)
router.post('/getDataByIds', getDataByIds)
router.post('/', storeData)
router.patch('/:id', updateData)
router.delete('/:id', deleteData)

module.exports = router