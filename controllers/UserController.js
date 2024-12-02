const Model = require('../models/UserModel')
const ChapelModel = require('../models/ChapelModel')
const SubscriptionModel = require('../models/SubscriptionModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const moment = require('moment')
const sendVerificationEmail = require('../utils/sendVerificationEmail');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const getUsers = async (req, res) => {
    try {
        const data = await Model.find({}).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUsersByParishId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ chapel: id }).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    try {
        const data = await Model.findOne({ _id: id })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await Model.loginHash(email, password)
        const token = createToken(data._id)
        res.status(200).json({
            token,
            user: {
                _id: data._id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                parish: data.chapel,
                role: data.role
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const register = async (req, res) => {
    const { role, subscription, chapelName, chapelAddress, code, email, chapel } = req.body
    let chapelId;
    let newFormData = {};
    try {
        if (!chapel) {
            if (role == 2) {
                const chapelExist = await ChapelModel.findOne({ chapel: chapelName })
                const emailExist = await Model.findOne({ email: email })
                if (chapelExist) {
                    throw Error('Chapel already in use')
                }
                if (emailExist) {
                    throw Error('Email already in use')
                }
                const chapel = await ChapelModel.create({
                    chapel: chapelName,
                    address: chapelAddress,
                    code: code
                })
                chapelId = chapel._id
                if (subscription == 1) {
                    await SubscriptionModel.create({
                        chapel: chapel._id,
                        subscriptionPlan: subscription,
                        startDate: moment(),
                        endDate: moment().add(1, 'Y'),
                        amount: 100,
                        status: true
                    })
                }
                if (subscription == 2) {
                    await SubscriptionModel.create({
                        chapel: chapel._id,
                        subscriptionPlan: subscription,
                        startDate: moment(),
                        endDate: moment().add(3, 'M'),
                        amount: 0,
                        status: true
                    })
                }
            }
        }

        if (chapelId) {
            newFormData = {
                ...req.body,
                chapel: chapelId
            }
        } else {
            newFormData = {
                ...req.body
            }
        }
        const user = await Model.registerHash(newFormData)
        const token = createToken(user._id)
        const userData = await Model.findOne({ _id: user._id }).populate({
            path: 'chapel',
            model: 'Chapel',
        })

        // Generate a verification token
        const verificationToken = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1d' });
        // Send verification email
        await sendVerificationEmail(email, user._id, verificationToken);

        res.status(200).json({
            token,
            message: 'User registered successfully. Please check your email to verify your account.',
            user: {
                _id: userData._id,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                middleName: userData.middleName,
                parish: userData.chapel,
                role: userData.role
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Delete Data
const deleteData = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOneAndDelete({ _id: id })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json({ message: 'Successfully Deleted' })
}

//Update Data
const updateData = async (req, res) => {
    let newPassword
    const { id } = req.params
    console.log(id)
    const { resetPassword, password } = req.body
    if (resetPassword) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(resetPassword, salt)
        newPassword = hash
    } else {
        newPassword = password
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }

    const data = await Model.findOneAndUpdate({ _id: id }, {
        ...req.body,
        password: newPassword
    })

    if (!data) {
        return res.status(404).json({ error: 'No record found' })
    }

    res.status(200).json(req.body)
}

const verifyEmail = async (req, res) => {
    const { token, userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);

        if (decoded.userId !== userId) {
            throw new Error('Invalid token or user ID.');
        }

        // Update user to verified
        const user = await Model.findByIdAndUpdate(userId, { verified: true }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'Email successfully verified!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const sendPasswordResetEmail = async (email, token) => {
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Your Password',
        html: `
            <h1>Password Reset Request</h1>
            <p>We received a request to reset your password. Click the link below to reset it:</p>
            <a href="${resetLink}" style="color: blue; text-decoration: underline;">Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};

const requestResetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Model.findOne({ email });
        if (!user) throw new Error('Email not found.');

        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
        await sendPasswordResetEmail(email, token);

        res.status(200).json({ message: 'Reset email sent.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const confirmResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await Model.findById(decoded.userId);

        if (!user) throw new Error('Invalid token.');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    login,
    register,
    getUsers,
    getUserById,
    updateData,
    deleteData,
    getUsersByParishId,
    verifyEmail, 
    requestResetPassword, 
    confirmResetPassword
}