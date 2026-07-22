const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: Number, // Since MySQL uses integer IDs in Auth service
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    savedCars: [{
        type: String // Car IDs
    }],
    preferences: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

// Add index on userId for fast lookups (lean queries)
profileSchema.index({ userId: 1 });

module.exports = mongoose.model('Profile', profileSchema);
