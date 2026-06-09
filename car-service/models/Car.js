const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    tagline: { type: String },
    budget: { type: String },
    type: { type: String, enum: ['New', 'Used'], default: 'New' },
    imageUrl: { type: String, required: true },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
