const mongoose = require('mongoose');

// Define the schema
const BarsSchema = new mongoose.Schema({
    barName: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // Must be 'Point'
            required: true,
        },
        coordinates: {
            type: [Number], // Array of numbers [longitude, latitude]
            required: true,
        },
    },
    capacity: {
        type: Number,
        default: 0,
    },
    barPackages: [{
        type: mongoose.Types.ObjectId,
        ref: 'Packages',
    }],
});

// Create a geospatial index on the location field
BarsSchema.index({ location: '2dsphere' });

const Bars = mongoose.model('Bars', BarsSchema);
module.exports = Bars;
