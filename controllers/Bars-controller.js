const {
    getAllBars,
    getAllBarsWithSameAttribute,
    getBarById,
    getBar,
    removeAllBarsFromThisList,
    removeBarFromDataBase,
    addBar,
    updateBar,
    updateBarById,
    getAllPackagesForBar,
    findNearestBars // Import the new function
} = require('../services/Bars-services');

const serverResponse = require('../utils/serverResponse');
const Bars = require('../models/Bars');
const Packages = require('../models/Packages');

// Controller to get a bar by its name
const getBarByNameCont = async (req, res) => {
    try {
        const bar = await getBar(req.params.barName);
        if (!bar) {
            return serverResponse(res, 404, { message: "No bar found with the given name" });
        }
        return serverResponse(res, 200, bar);
    } catch (e) {
        console.error('Error in getBarByNameCont:', e);
        return serverResponse(res, 500, { message: 'Error occurred while trying to get bar by name' });
    }
};

// Controller to get a bar by its ID
const getBarByIdCont = async (req, res) => {
    try {
        const bar = await getBarById(req.params.barId);
        if (!bar) {
            return serverResponse(res, 404, { message: "No bar found with the given ID" });
        }
        return serverResponse(res, 200, bar);
    } catch (e) {
        console.error('Error in getBarByIdCont:', e);
        return serverResponse(res, 500, { message: 'Error occurred while trying to get bar by ID' });
    }
};

// Controller to delete a bar by its name
const deleteBarByNameCont = async (req, res) => {
    try {
        const barName = req.params.barName;
        const deletedBar = await removeBarFromDataBase(barName);

        if (!deletedBar.deletedCount) {
            return serverResponse(res, 404, { message: "The bar doesn't exist" });
        }

        return serverResponse(res, 200, { message: "Bar removed successfully" });
    } catch (e) {
        console.error('Error in deleteBarByNameCont:', e);
        return serverResponse(res, 500, { message: 'Error occurred while trying to remove bar' });
    }
};

// Controller to create a new bar
const createBarCont = async (req, res) => {
    try {
        const { barName, location, capacity, packages } = req.body;

        if (!barName || !location || capacity == null) {
            return serverResponse(res, 400, { message: "Missing required information" });
        }

        const existingBar = await getBar(barName);
        if (existingBar) {
            return serverResponse(res, 400, { message: "Bar already exists" });
        }

        const newBar = new Bars({ barName, location, capacity });
        await newBar.save();

        if (packages && packages.length > 0) {
            const createdPackages = await Promise.all(packages.map(async (pkg) => {
                const newPackage = new Packages(pkg);
                await newPackage.save();
                return newPackage._id;
            }));

            newBar.barPackages = createdPackages;
            await newBar.save();
        }

        return serverResponse(res, 201, newBar);
    } catch (e) {
        console.error('Error in createBarCont:', e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to add bar' });
    }
};

// Controller to update a bar by its name or ID
const editBarCont = async (req, res) => {
    try {
        let bar;

        if (req.params.barName) {
            bar = await getBar(req.params.barName);
        }

        if (req.params.barId) {
            bar = await getBarById(req.params.barId);
        }

        if (!bar) {
            return serverResponse(res, 404, { message: "No bar found with the given identifier" });
        }

        const updatedBar = await updateBar(bar.barName, req.body);

        if (req.body.packages) {
            const { packages } = req.body;

            const createdPackages = await Promise.all(packages.map(async (pkg) => {
                const newPackage = new Packages(pkg);
                await newPackage.save();
                return newPackage._id;
            }));

            updatedBar.barPackages = createdPackages;
            await updatedBar.save();
        }

        return serverResponse(res, 200, updatedBar);
    } catch (e) {
        console.error('Error in editBarCont:', e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to update bar' });
    }
};

// Controller to get all bar names
const getAllBarsNamesCont = async (req, res) => {
    try {
        const allBars = await getAllBars();
        if (!allBars || allBars.length === 0) {
            return serverResponse(res, 404, { message: "No bars found" });
        }
        const barNames = allBars.map(bar => bar.barName);
        return serverResponse(res, 200, barNames);
    } catch (e) {
        console.error('Error in getAllBarsNamesCont:', e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to get all bar names' });
    }
};

// Controller to get all bars
const getAllBarsCont = async (req, res) => {
    try {
        const allBars = await getAllBars();
        if (!allBars || allBars.length === 0) {
            return serverResponse(res, 404, { message: "No bars available" });
        }
        return serverResponse(res, 200, allBars);
    } catch (e) {
        console.error('Error in getAllBarsCont:', e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to get all bars' });
    }
};

// Controller to get all packages for a specific bar by ID
const getAllPackagesForBarCont = async (req, res) => {
    try {
        const barId = req.params.barId;
        const barWithPackages = await getAllPackagesForBar(barId);

        if (!barWithPackages) {
            return serverResponse(res, 404, { message: "No bar or packages found with the given ID" });
        }

        return serverResponse(res, 200, barWithPackages.barPackages);
    } catch (e) {
        console.error('Error in getAllPackagesForBarCont:', e);
        return serverResponse(res, 500, { message: 'Error occurred while trying to get packages for bar' });
    }
};

// New controller to find the nearest bar based on location
const findNearestBarCont = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return serverResponse(res, 400, { message: "Latitude and longitude are required" });
        }

        const nearestBars = await findNearestBars(parseFloat(longitude), parseFloat(latitude));

        if (nearestBars.length === 0) {
            return serverResponse(res, 404, { message: "No bars found near your location" });
        }

        return serverResponse(res, 200, nearestBars);
    } catch (e) {
        console.error('Error in findNearestBarCont:', e);
        return serverResponse(res, 500, { message: 'Error occurred while trying to find the nearest bar' });
    }
};

module.exports = {
    getBarByNameCont,
    getBarByIdCont,
    deleteBarByNameCont,
    createBarCont,
    editBarCont,
    getAllBarsNamesCont,
    getAllBarsCont,
    getAllPackagesForBarCont,
    findNearestBarCont // Export the new controller
};
