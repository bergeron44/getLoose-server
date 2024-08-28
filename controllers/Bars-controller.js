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
    addPackage // Import addPackage if necessary
} = require('../services/Bars-services');

const serverResponse = require('../utils/serverResponse');
const Bars = require('../models/Bars'); // Ensure Bars model is imported
const Packages = require('../models/Packages'); // Ensure Packages model is imported

// Controller to get a bar by its name
const getBarByNameCont = async (req, res) => {
    try {
        const bar = await getBar(req.params.barName);
        if (!bar) {
            return serverResponse(res, 404, { message: "No bar found with the given name" });
        }
        return serverResponse(res, 200, bar);
    } catch (e) {
        console.error(e);
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
        console.error(e);
        return serverResponse(res, 500, { message: 'Error occurred while trying to get bar by ID' });
    }
};

// Controller to delete a bar by its name
const deleteBarByNameCont = async (req, res) => {
    try {
        const barName = req.params.barName;
        const deletedBar = await removeBarFromDataBase(barName);

        if (!deletedBar) {
            return serverResponse(res, 404, { message: "The bar doesn't exist" });
        }

        return serverResponse(res, 200, { message: "Bar removed successfully" });
    } catch (e) {
        console.log(e);
        return serverResponse(res, 500, { message: 'Error occurred while trying to remove bar' });
    }
};

// Controller to create a new bar
const createBarCont = async (req, res) => {
    try {
        const { barName, location, capacity, packages } = req.body; // Expecting packages in the request body

        if (!barName || !location || capacity == null) {
            return serverResponse(res, 400, { message: "Missing required information" });
        }

        const existingBar = await getBar(barName);
        if (existingBar) {
            return serverResponse(res, 400, { message: "Bar already exists" });
        }

        // Create the new bar
        const newBar = new Bars({ barName, location, capacity });
        await newBar.save();

        // Create and associate packages if provided
        if (packages && packages.length > 0) {
            const createdPackages = await Promise.all(packages.map(async (pkg) => {
                const newPackage = new Packages(pkg);
                await newPackage.save();
                return newPackage._id; // Return the ID of the created package
            }));

            // Update the bar with the created packages
            newBar.barPackages = createdPackages;
            await newBar.save();
        }

        return serverResponse(res, 201, newBar);
    } catch (e) {
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to add bar' });
    }
};

// Controller to update a bar by its name or ID
const editBarCont = async (req, res) => {
    try {
        let bar;

        // Check if barName is provided in the params
        if (req.params.barName) {
            bar = await getBar(req.params.barName);
        }

        // Check if barId is provided in the params
        if (req.params.barId) {
            bar = await getBarById(req.params.barId);
        }

        // If no bar found with the given name or ID
        if (!bar) {
            return serverResponse(res, 404, { message: "No bar found with the given identifier" });
        }

        // Update the bar
        const updatedBar = await updateBar(bar.barName, req.body);

        // Update packages if provided in the request body
        if (req.body.packages) {
            const { packages } = req.body;

            // Create and associate new packages
            const createdPackages = await Promise.all(packages.map(async (pkg) => {
                const newPackage = new Packages(pkg);
                await newPackage.save();
                return newPackage._id;
            }));

            // Update the bar with the new packages
            updatedBar.barPackages = createdPackages;
            await updatedBar.save();
        }

        return serverResponse(res, 200, updatedBar);
    } catch (e) {
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to update bar' });
    }
};

// Controller to get all bar names
const getAllBarsNamesCont = async (req, res) => {
    try {
        const allBars = await getAllBars();
        if (!allBars) {
            return serverResponse(res, 404, { message: "No bars found" });
        }
        const barNames = allBars.map(bar => bar.barName);
        return serverResponse(res, 200, barNames);
    } catch (e) {
        console.error(e);
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
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to get all bars' });
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
};
