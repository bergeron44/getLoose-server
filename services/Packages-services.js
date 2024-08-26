const mongoose = require('mongoose');
const Packages = require('../models/Packages');

const getPackageByPrice = (packagePrice) => {
    return Packages.findOne({ price: packagePrice });
};

const getPackageId = (packageId) => {
    return Packages.findById(packageId);
};

const getAllPackages = () => {
    return Packages.find({});
};

const addPackages = (packageObject) => {
    const newPackage = new Packages(packageObject);
    return newPackage.save();
};

const removePackageById = (packageId) => {
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
        throw new Error('Invalid package ID');
    }
    return Packages.findByIdAndDelete(packageId);
};

const removeAllPackagesFromList = (packagesIdList) => {
    if (!Array.isArray(packagesIdList) || !packagesIdList.every(id => mongoose.Types.ObjectId.isValid(id))) {
        throw new Error('Invalid list of package IDs');
    }
    return Packages.deleteMany({ _id: { $in: packagesIdList } });
};

const updatePackageById = (packageId, newContent) => {
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
        throw new Error('Invalid package ID');
    }
    return Packages.findByIdAndUpdate(packageId, newContent, { new: true });
};
// Function to check if a package with the same price and content exists
const checkPackageExists = (price, packagesContant) => {
    return Packages.findOne({ price, packagesContant });
};

module.exports = {
    getPackageByPrice,
    getPackageId,
    getAllPackages,
    addPackages,
    removePackageById,
    removeAllPackagesFromList,
    updatePackageById,
    checkPackageExists
    
};
