const Report = require('../models/Report');

const createReport = async (req, res) => {
    try {
        const { bin, overflowing } = req.body;
        if (!bin) return res.status(400).json({ message: 'Bin is required'});

        const report = await Report.create({
            bin,
            resident: req.user.id,
            overflowing: overflowing || false, 
        });

        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { createReport };