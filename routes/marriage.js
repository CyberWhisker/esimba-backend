const express = require('express')
const {getData, storeData, updateData, deleteData, } = require('../controllers/MarriageController')
const router = express.Router();

//Get Data
router.get('/', getData)

router.post('/', storeData)

router.patch('/:id', updateData)

router.delete('/:id', deleteData)

module.exports = router