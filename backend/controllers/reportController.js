const Report = require('../models/Report');

const createReport = async (req, res) => {
    try {
        const { bin, overflowing, notes } = req.body;
        if (!bin) return res.status(400).json({ message: 'Bin is required'});

        const report = await Report.create({
            bin,
            resident: req.user.id,
            overflowing: overflowing || false, 
            notes: notes || '',
        });

        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getMyReports = async (req, res) => {
    try {
        const reports = await Report.find({ resident: req.user.id })
            .populate('bin', 'binId location type')
            .sort({ createdAt: -1 });
        
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });

        if (report.resident.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own reports' });
        }

        await report.deleteOne();
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReport, getMyReports, deleteReport };