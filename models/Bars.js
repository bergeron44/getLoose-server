const mongoose = require('mongoose');

// Define the schema for Bars
const BarsSchema = new mongoose.Schema({
    barName: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0], // Default to [0, 0] if not provided
        },
    },
    capacity: {
        type: Number,
        default: 0,
    },
    barPackages: [{
        type: mongoose.Types.ObjectId,
        ref: 'Packages',
        default: [],
    }],
    qrUrl: {
        type: String,
        required: true,
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Invalid URL'],
    },
    barIp: {
        type: String,
        required: true,
        default: '0.0.0.0',
        match: [/^(?:\d{1,3}\.){3}\d{1,3}$/, 'Invalid IP address'],
    },
    gameStats: {
        datingGame: {
            type: Number,
            default: 0,
        },
        friendsGame: {
            type: Number,
            default: 0,
        },
        partyGame: {
            type: Number,
            default: 0,
        },
    },
});

// Create a geospatial index on the location field for efficient spatial queries
BarsSchema.index({ location: '2dsphere' });

const Bars = mongoose.model('Bars', BarsSchema);

module.exports = Bars;
