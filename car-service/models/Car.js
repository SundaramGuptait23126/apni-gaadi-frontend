const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    tagline: { type: String },
    budget: { type: String },
    type: { type: String, enum: ['New', 'Used'], default: 'New' },
    category: { type: String, enum: ['Most Searched Cars', 'Electric Cars', 'Latest Cars', 'Upcoming Cars'], required: true },
    subCategory: { type: String, enum: ['SUV', 'Hatchback', 'Sedan', 'MUV', 'Luxury'] },
    imageUrl: { type: String, required: true },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
