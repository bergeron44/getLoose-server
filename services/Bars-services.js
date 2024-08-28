const Bars = require('../models/Bars');

// Get a bar by its name
const getBar = (barName) => {
    return Bars.findOne({ barName });
};

// Get a bar by its ID
const getBarById = (barId) => {
    return Bars.findOne({ _id: barId });
};

// Get all bars with the same attribute value
const getAllBarsWithSameAttribute = (attribute, whatToCheck) => {
    return Bars.find({ [attribute]: whatToCheck });
};

// Get all bars
const getAllBars = () => {
    return Bars.find({});
};

// Add a new bar
const addBar = (barObject) => {
    const newBar = new Bars(barObject);
    return newBar.save();
};

// Remove a bar by name
const removeBarFromDataBase = (barName) => {
    return Bars.deleteOne({ barName });
};

// Remove multiple bars by a list of names
const removeAllBarsFromThisList = (BarsListNames) => {
    return Bars.deleteMany({ barName: { $in: BarsListNames } });
};

// Update a bar by its name
const updateBar = (barName, newContent) => {
    return Bars.findOneAndUpdate({ barName }, newContent, { new: true });
};

// Update a bar by its ID
const updateBarById = (barId, newContent) => {
    return Bars.findOneAndUpdate({ _id: barId }, newContent, { new: true });
};

// Get all packages associated with a specific bar
const getAllPackagesForBar = (barId) => {
    return Bars.findById(barId).populate('barPackages').exec();
};

// New function to find bars near a given location
const findNearestBars = async (longitude, latitude, maxDistance = 10000) => {
    return Bars.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude], // [longitude, latitude]
                },
                $maxDistance: maxDistance, // Max distance in meters
            },
        },
    });
};

module.exports = {
    getBar,
    getBarById,
    getAllBarsWithSameAttribute,
    getAllBars,
    addBar,
    removeBarFromDataBase,
    removeAllBarsFromThisList,
    updateBar,
    updateBarById,
    getAllPackagesForBar,
    findNearestBars, // Export the new function
};
