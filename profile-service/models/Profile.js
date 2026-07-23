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
    shortlistedVehicles: [{
        type: String // Car IDs (replaces savedCars)
    }],
    orders: [{
        type: String // Order IDs
    }],
    myVehicles: [{
        type: String // Car IDs of owned vehicles
    }],
    myGarage: [{
        type: String // Car IDs in garage
    }],
    activityLogs: [{
        action: String,
        timestamp: { type: Date, default: Date.now }
    }],
    consents: {
        emailNotifications: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: true },
        marketingOffers: { type: Boolean, default: false }
    },
    linkedAccounts: [{
        provider: String, // e.g., 'google', 'facebook'
        providerId: String
    }],
    preferences: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

// Add index on userId for fast lookups (lean queries)
profileSchema.index({ userId: 1 });

module.exports = mongoose.model('Profile', profileSchema);
