const express = require('express');
const {
    login,
    register,
    getUsers,
    getUserById,
    deleteData,
    updateData,
    getUsersByParishId,
    verifyEmail,
    requestResetPassword,
    confirmResetPassword
} = require('../controllers/UserController');

const router = express.Router();

// User Login
router.post('/login', login);

// Request reset password
router.post('/request-reset-password', requestResetPassword);

// Confirm reset password
router.post('/confirm-reset-password', confirmResetPassword);

// User Registration
router.post('/register', register);

// Verify Email
router.get('/verify', verifyEmail);

// Get All Users
router.get('/', getUsers);

// Get User by Parish ID
router.get('/getUsersByParishId/:id', getUsersByParishId);

// Get Single User by ID
router.get('/:id', getUserById);

// Delete User
router.delete('/:id', deleteData);

// Update User
router.patch('/:id', updateData);

module.exports = router;
