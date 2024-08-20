const {
    getBarByNameCont,
    getBarByIdCont,
    deleteBarByNameCont,
    createBarCont,
    editBarCont,
    getAllBarsNamesCont,
    getAllBarssCont,
} = require('../controllers/Bars-controller');

module.exports = function (app) {
    app
        .get('/api/bar/:barName', getBarByNameCont)                  // Retrieve a bar by name
        .get('/api/bars', getAllBarssCont)                           // Retrieve all bars
        .get('/api/bar/:barId', getBarByIdCont)                      // Retrieve a bar by ID
        .get('/api/bars/names', getAllBarsNamesCont)                 // Retrieve all bar names
        .post('/api/bar/:barName/edit/name', editBarCont)            // Update bar name by current name
        .post('/api/bar/:barId/edit', editBarCont)                   // Update bar by ID
        .post('/api/bar/create', createBarCont)                      // Create a new bar
        .delete('/api/bar/:barName/delete', deleteBarByNameCont);    // Delete a bar by name
};
