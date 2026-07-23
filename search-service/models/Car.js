const mongoose = require('mongoose');

// We only need the fields we are going to search or return in the autocomplete UI
const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    variant: String,
    features: [String],
    price: Number,
    image: String // or imageUrl depending on your data
}, { strict: false }); // strict: false allows Mongoose to query other fields if needed without defining them

module.exports = mongoose.model('Car', carSchema);
