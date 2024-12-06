const express = require('express');
const router = express.Router();
const { uploadRequirements, getDataByReserveId } = require('../controllers/RequirementController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the directory exists or create it
const ensureDirectoryExistence = (filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../esimba/public/requirements/');
        ensureDirectoryExistence(uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

// Multer fields configuration for multiple files
const uploadFields = upload.fields([
    { name: 'cenomar', maxCount: 1 },
    { name: 'picture', maxCount: 1 },
    { name: 'marriageLicense', maxCount: 1 },
    { name: 'baptismal', maxCount: 1 },
    { name: 'confirmation', maxCount: 1 },
    { name: 'publication', maxCount: 1 },
    { name: 'permission', maxCount: 1 },
    { name: 'birthCertificate', maxCount: 1 },
    { name: 'baptismalSponsor', maxCount: 1 },
    { name: 'sponsor', maxCount: 1 },
    { name: 'deathCertificate', maxCount: 1 },
]);

// Routes
router.post('/upload', uploadFields, uploadRequirements);
router.get('/getDataByReserveId/:id', getDataByReserveId);

module.exports = router;
