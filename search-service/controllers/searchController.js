const Car = require('../models/Car');

const searchCars = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 2) {
            return res.status(200).json({ results: [] });
        }

        // Case-insensitive regex search
        const regex = new RegExp(q, 'i');

        // Search in brand, model, variant, and optionally features
        // We limit to 5-10 results for a quick dropdown (autocomplete)
        const results = await Car.find({
            $or: [
                { brand: regex },
                { model: regex },
                { variant: regex },
                { features: regex }
            ]
        })
        .select('brand model variant price image _id')
        .limit(8)
        .lean();

        res.status(200).json({ results });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Internal server error during search' });
    }
};

module.exports = { searchCars };
