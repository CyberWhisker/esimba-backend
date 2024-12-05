const express = require('express')
const {
    getData,
    storeData,
    updateData,
    deleteData,
    getDataByParishId
} = require('../controllers/PriestController')
const router = express.Router();

//Get Data
router.get('/', getData)
router.get('/getDataByParishId/:id', getDataByParishId)
router.post('/', storeData)
router.patch('/:id', updateData)
router.delete('/:id', deleteData)

module.exports = router