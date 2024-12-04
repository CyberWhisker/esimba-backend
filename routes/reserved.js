const express = require('express')
const { getData, storeData, updateData, deleteData, getDataByParishId, getDataByUserId, getDataById, getDataByEventId } = require('../controllers/ReservedController')
const router = express.Router();

//Get Data
router.get('/', getData)
router.get('/getDataByEventId/:id', getDataByEventId)
router.get('/getDataById/:id', getDataById)
router.get('/getDataByParishId/:id', getDataByParishId)
router.get('/getDataByUserId/:id', getDataByUserId)
router.post('/', storeData)
router.patch('/:id', updateData)
router.delete('/:id', deleteData)

module.exports = router