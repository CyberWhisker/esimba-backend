const express = require('express')
const multer = require('multer')
const { getData, storeData, updateData, deleteData, getDataByChapelId } = require('../controllers/DonationController')
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
router.get('/getDataByChapelId/:id', getDataByChapelId)
router.post('/', upload.single('file'), storeData)
router.patch('/:id',upload.single('file'), updateData)
router.delete('/:id', deleteData)

module.exports = router