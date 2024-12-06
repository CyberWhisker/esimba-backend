const express = require('express')
const {
    getData,
    storeData,
    updateData,
    deleteData,
    getDataById,
    getDataByItem,
} = require('../controllers/PriceController')
const router = express.Router();

//Get Data
router.get('/', getData)
router.get('/getDataByItem/:item', getDataByItem)
router.get('/:id', getDataById)
router.post('/', storeData)
router.patch('/:id', updateData)
router.delete('/:id', deleteData)

module.exports = router