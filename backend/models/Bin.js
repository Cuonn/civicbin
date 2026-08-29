const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
    binId: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['General', 'Recycling'], required: true },
    fillStatus: { type: String, enum: ['Full', 'Not Full'], default: 'Not Full' },
}, { timestamps: true });

module.exports = mongoose.model('Bin', binSchema);