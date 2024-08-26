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
} = require('../services/Bars-services');
const serverResponse = require('../utils/serverResponse');

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
        const { barName, location, capacity } = req.body;
        if (!barName || !location || capacity == null) {
            return serverResponse(res, 400, { message: "Missing required information" });
        }
        const existingBar = await getBar(barName);
        if (existingBar) {
            return serverResponse(res, 400, { message: "Bar already exists" });
        }
        const newBar = await addBar(req.body);
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
        const updatedBar = await updateBar(bar.barName, req.body); // Assuming `updateBar` still uses barName as identifier
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
