const express = require('express')
const {getData, storeData, updateData, deleteData, getAppointmentData, getCertificateData, getAppointmentByParishId, getDataByUserId, getCertificateByParishId} = require('../controllers/RequestController')
const router = express.Router();

//Get Data
router.get('/', getData)
router.get('/getDataByUserId/:id', getDataByUserId)
router.get('/getAppointmentByParishId/:id', getAppointmentByParishId)
router.get('/getCertificateByParishId/:id', getCertificateByParishId)
router.get('/appointment', getAppointmentData)
router.get('/certificate', getCertificateData)
router.post('/', storeData)
router.patch('/:id', updateData)
router.delete('/:id', deleteData)

module.exports = router