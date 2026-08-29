const Bin = require('../models/Bin');

const createBin = async (req, res) => {
    try {
        const { binId, location, type, fillStatus } = req.body;

        if (!binId?.trim()) return res.status(400).json({ message: 'Bin ID is required' });
        if (!location?.trim()) return res.status(400).json({ message: 'Location is required' });

        const bin = await Bin.create({ binId, location, type, fillStatus });
        res.status(201).json(bin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBins = async (req, res) => {
    try {
        const bins = await Bin.find();
        res.json(bins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBin = async (req, res) => {
    try {
        const bin = await Bin.findById(req.params.id);
        if (!bin) return res.status(404).json({ message: 'Bin not found' });

        const { location, type, fillStatus } = req.body;
        if (location) bin.location = location;
        if (type) bin.type = type;
        if (fillStatus) bin.fillStatus = fillStatus;

        const updatedBin = await bin.save();
        res.json(updatedBin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBin = async (req, res) => {
    try {
        const bin = await Bin.findById(req.params.id);
        if (!bin) return res.status(404).json({ message: 'Bin not found' });
        await bin.deleteOne();
        res.json({ message: 'Bin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBin, getBins, updateBin, deleteBin };