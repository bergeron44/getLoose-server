const {
    getBarByNameCont,
    getBarByIdCont,
    deleteBarByNameCont,
    createBarCont,
    editBarCont,
    getAllBarsNamesCont,
    getAllBarsCont,
    getAllPackagesForBarCont,
    findNearestBarCont,
    getBarByQrUrlCont, // Import the new controller function
    updateLiveGameWithIP,
    updateGameStatsCont
} = require('../controllers/Bars-controller');

module.exports = function (app) {
    app
        .get('/api/bar/:barName', getBarByNameCont)                  // Retrieve a bar by name
        .get('/api/bars', getAllBarsCont)                            // Retrieve all bars
        .get('/api/bar/id/:barId', getBarByIdCont)                      // Retrieve a bar by ID
        .get('/api/bars/names', getAllBarsNamesCont)                 // Retrieve all bar names
        .get('/api/bar/:barId/packages', getAllPackagesForBarCont)   // Retrieve all packages for a specific bar by ID
        .get('/api/bars/nearest', findNearestBarCont)                 // Retrieve the nearest bar based on location
        .get('/api/bar/qr/:qrUrl', getBarByQrUrlCont)                // Retrieve a bar by QR URL
        .post('/api/bar/:barName/edit/name', editBarCont)            // Update bar name by current name
        .post('/api/bar/:barId/edit', editBarCont)                   // Update bar by ID
        .post('/api/bar/create', createBarCont)                      // Create a new bar
        .post('/api/live-games/update-ip', updateLiveGameWithIP)
        .post('/api/bar/:barId/game-stats/:gameType', updateGameStatsCont)
        .delete('/api/bar/:barName/delete', deleteBarByNameCont);    // Delete a bar by name

};
