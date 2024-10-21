const express = require('express')
const {getData, storeData, updateData, deleteData, getAppointmentData, getCertificateData} = require('../controllers/RequestController')
const router = express.Router();

//Get Data
router.get('/', getData)
router.get('/appointment', getAppointmentData)
router.get('/certificate', getCertificateData)
router.post('/', storeData)
router.patch('/:id', updateData)
router.delete('/:id', deleteData)

module.exports = router