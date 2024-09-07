const mongoose = require('mongoose');

// Define the schema for Bars
const BarsSchema = new mongoose.Schema({
    barName: {
        type: String,
        required: true, // barName is mandatory
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // Specifies that the type must be 'Point'
            default: 0,
        },
        coordinates: {
            type: [Number], // Array of numbers representing [longitude, latitude]
            default: 0,
        },
    },
    capacity: {
        type: Number,
        default: 0, // Default capacity is 0
    },
    barPackages: [{
        type: mongoose.Types.ObjectId,
        ref: 'Packages', // Reference to the Packages collection
        default: [], // Default to an empty array if no packages are provided
    }],
    qrUrl: {
        type: String,
        required: true, // qrUrl is mandatory
    },
    barIp: {
        type: String,
        required: true, // the bar ip
    },
});

// Create a geospatial index on the location field for efficient spatial queries
BarsSchema.index({ location: '2dsphere' });

const Bars = mongoose.model('Bars', BarsSchema);

module.exports = Bars;
