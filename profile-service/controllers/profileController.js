const Profile = require('../models/Profile');

const getProfile = async (req, res) => {
    try {
        const userId = req.headers['x-user-id']; // Injected by API Gateway
        const email = req.headers['x-user-email'];

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: No User ID provided' });
        }

        // Fast lean query
        let profile = await Profile.findOne({ userId }).lean();

        if (!profile) {
            // Create an empty profile on the fly if it doesn't exist
            const newProfile = new Profile({ userId });
            await newProfile.save();
            profile = newProfile.toObject();
        }

        // Attach email from Auth service for completeness (not stored in Profile DB)
        profile.email = email;

        res.status(200).json({ profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { 
            phone, address, avatarUrl, 
            shortlistedVehicles, orders, myVehicles, 
            myGarage, activityLogs, consents, 
            linkedAccounts, preferences 
        } = req.body;

        // Upsert will create it if it doesn't exist
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId },
            { 
                phone, address, avatarUrl, 
                shortlistedVehicles, orders, myVehicles, 
                myGarage, activityLogs, consents, 
                linkedAccounts, preferences 
            },
            { new: true, upsert: true, runValidators: true }
        ).lean();

        res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getProfile, updateProfile };
