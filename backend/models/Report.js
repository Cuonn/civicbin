const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    bin: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin', required: true },
    resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    overflowing: { type: Boolean, default: false },
    notes: { type: String, default: ''},
    status: { type: String, enum: ['Pending', 'Confirmed', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);