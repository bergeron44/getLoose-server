const {
    getPackageCont,
    deletePackageCont,
    deleteAllPackagesFromListCont,
    createPackageCont,
    editPackageByIdCont,
    getAllPackagesCont,
} = require('../controllers/Packages-controller');

module.exports = function (app) {
    app
        // Get a specific package by ID
        .get('/api/package/:packageId',getPackageCont)
        
        // Get all packages
        .get('/api/packages', getAllPackagesCont)
        
        // Create a new package
        .post('/api/package/create', createPackageCont)
        
        // Edit a package by ID
        .post('/api/package/:packageId/edit', editPackageByIdCont)
        
        // Delete a specific package by ID
        .delete('/api/package/:packageId/delete', deletePackageCont)
        
        // Delete all packages from a list
        .delete('/api/packages/deleteAll', deleteAllPackagesFromListCont);
}
