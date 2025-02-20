const Model = require('../models/PriceModel')
const mongoose = require('mongoose')

const getData = async (req, res) => {
    try {
        const data = await Model.find({}).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataById = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Model.find({ _id: id }).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDataByItem = async (req, res) => {
    const { item } = req.params
    try {
        const data = await Model.find({ item: item }).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const storeData = async (req, res) => {
    try {
        const requestData = req.body; // Incoming data

        let operations = [];

        // Loop through each category (e.g., marriage, baptismal, burial)
        for (const type in requestData) {
            if (Array.isArray(requestData[type])) {
                for (const item of requestData[type]) {
                    const { name, price } = item;

                    // Convert price to number
                    const priceValue = parseFloat(price);

                    // Update if name exists, otherwise insert a new record
                    operations.push(
                        Model.findOneAndUpdate(
                            { type, name }, // Find by type and name
                            { price: priceValue }, // Update price
                            { upsert: true, new: true } // Create if not exists
                        )
                    );
                }
            }
        }

        // Execute all operations in parallel
        const results = await Promise.all(operations);

        res.status(200).json({
            message: "Prices updated successfully",
            data: results
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateData = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    try {
        const data = await Model.findOneAndUpdate({ _id: id }, {
            ...req.body
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteData = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not valid ID' })
    }
    try {
        const data = await Model.findOneAndDelete({ _id: id })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getData,
    getDataById,
    getDataByItem,
    storeData,
    updateData,
    deleteData,
}