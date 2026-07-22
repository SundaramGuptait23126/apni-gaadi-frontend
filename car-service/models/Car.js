const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    tagline: { type: String },
    budget: { type: String },
    type: { type: String, enum: ['New', 'Used'], default: 'New' },
    category: { type: String, enum: ['Most Searched Cars', 'Electric Cars', 'Latest Cars', 'Upcoming Cars'], required: true },
    subCategory: { type: String, enum: ['SUV', 'Hatchback', 'Sedan', 'MUV', 'Luxury'] },
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'CNG', 'Electric'], default: 'Petrol' },
    transmission: { type: String, enum: ['Manual', 'Automatic'], default: 'Manual' },
    engine: { type: String },
    groundClearance: { type: String },
    seatingCapacity: { type: String },
    imageUrl: { type: String, required: true },
    images: [{ type: String }],
    exteriorImages: [{ type: String }],
    interiorImages: [{ type: String }],
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

carSchema.index({ category: 1, subCategory: 1 });
carSchema.index({ isFeatured: 1 });
carSchema.index({ brand: 1 });
carSchema.index({ name: 'text', brand: 'text' });

module.exports = mongoose.model('Car', carSchema);
