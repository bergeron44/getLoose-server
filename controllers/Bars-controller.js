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
    findNearestBars,
    getBarByQrUrl // Import the new function
} = require('../services/Bars-services');

const serverResponse = require('../utils/serverResponse');
const Bars = require('../models/Bars');
const Packages = require('../models/Packages');
const LiveGame = require('../models/LiveGame'); // Assuming you have a LiveGame model

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
        // Dynamically import fetch
        const { default: fetch } = await import('node-fetch');

        // Check if the bar name already exists
        const existingBar = await Bars.findOne({ barName: req.body.barName });
        if (existingBar) {
            return res.status(400).json({ message: 'Bar name already exists.' });
        }

        // Fetch the IP address
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();
        const barIp = data.ip; // Get the IP address from the response

        // Create a new bar with the IP address
        const newBar = new Bars({
            barName: req.body.barName,
            location: req.body.location,
            capacity: req.body.capacity,
            barPackages: req.body.barPackages,
            qrUrl: req.body.qrUrl,
            barIp: barIp, // Assign the fetched IP address
        });

        // Save the new bar to the database
        await newBar.save();

        // Respond with the newly created bar
        res.status(201).json(newBar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Failed to create the bar.' });
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

// New controller function to find the nearest bar based on location
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

// New controller function to get a bar by QR URL
const getBarByQrUrlCont = async (req, res) => {
    try {
        const { qrUrl } = req.query; // Get the QR URL from query parameters

        if (!qrUrl) {
            return serverResponse(res, 400, { message: "QR URL is required" });
        }

        const bar = await getBarByQrUrl(qrUrl);

        if (!bar) {
            return serverResponse(res, 404, { message: "No bar found with the given QR URL" });
        }

        return serverResponse(res, 200, bar);
    } catch (e) {
        console.error('Error in getBarByQrUrlCont:', e);
        return serverResponse(res, 500, { message: 'Error occurred while trying to get bar by QR URL' });
    }
};

const updateGameStatsCont = async (req, res) => {
    const { barId, gameType } = req.params; // Get the bar ID and game type from the params

    try {
        // Find the bar by ID
        const bar = await Bars.findById(barId);
        if (!bar) {
            return res.status(404).json({ message: 'Bar not found' });
        }

        // Increment the game stats based on the game type
        if (gameType === 'datingGame') {
            bar.gameStats.datingGame += 1;
        } else if (gameType === 'friendsGame') {
            bar.gameStats.friendsGame += 1;
        } else if (gameType === 'partyGame') {
            bar.gameStats.partyGame += 1;
        } else {
            return res.status(400).json({ message: 'Invalid game type' });
        }

        // Save the updated bar
        await bar.save();
        res.status(200).json({ message: 'Game stats updated successfully', bar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



const updateLiveGameWithIP = async (req, res) => {
    try {
        const { barId, ipAddress } = req.body;

        if (!barId || !ipAddress) {
            return serverResponse(res, 400, { message: "Bar ID and IP address are required" });
        }

        // Find the live game for the given barId and update it
        const liveGame = await LiveGame.findOne({ bar: barId });

        if (!liveGame) {
            return serverResponse(res, 404, { message: "Live game not found for this bar" });
        }

        liveGame.playersNames.push(ipAddress);
        await liveGame.save();

        return serverResponse(res, 200, { message: 'Live game updated with new player IP address' });
    } catch (e) {
        console.error('Error in updateLiveGameWithIP:', e);
        return serverResponse(res, 500, { message: 'Error occurred while trying to update live game' });
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
    findNearestBarCont,
    getBarByQrUrlCont, // Export the new function
    updateLiveGameWithIP, // Export the new function
    updateGameStatsCont,
};
