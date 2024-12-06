const Requirement = require('../models/RequirementModel');

// Create or Update Requirements
const uploadRequirements = async (req, res) => {
    try {
        const { user, reserve } = req.body;

        // Initialize an array to hold the files
        const files = [];

        // Helper function to add files dynamically
        const addFiles = (fieldName) => {
            if (req.files[fieldName]) {
                req.files[fieldName].forEach((file) => {
                    files.push({
                        file: file.filename,
                        name: fieldName,
                    });
                });
            }
        };

        // List of all possible field names
        const fieldNames = [
            'cenomar',
            'picture',
            'marriageLicense',
            'baptismal',
            'confirmation',
            'publication',
            'permission',
            'birthCertificate',
            'baptismalSponsor',
            'sponsor',
            'deathCertificate',
        ];

        // Iterate through each field name and add files
        fieldNames.forEach(addFiles);

        // Create a new requirement document
        const requirement = new Requirement({
            user: user,
            reserve: reserve,
            data: files,
        });

        await requirement.save();

        res.status(201).json({ message: 'Requirements uploaded successfully!', data: requirement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get Requirements by User ID
const getDataByReserveId = async (req, res) => {
    try {
        const { id } = req.params;
        const requirement = await Requirement.findOne({ reserve: id });

        if (!requirement) {
            return res.status(404).json({ message: 'Requirements not found!' });
        }

        res.status(200).json(requirement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadRequirements, getDataByReserveId };
