const express = require('express')
const multer = require('multer')
const { getData, storeData, updateData, deleteData } = require('../controllers/TransactionController')
const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../esimba/public/gcashImg/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

//Get Data
router.get('/', getData)
router.post('/', upload.single('file'), storeData)
router.patch('/:id', updateData)
router.delete('/:id', deleteData)

module.exports = router