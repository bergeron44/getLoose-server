const {
    getPackageCont,
    deletePackageCont,
    deleteAllPackagesFromListCont,
    createPackageCont,
    editPackageByIdCont,
    getAllPackagesCont,
} = require('../controllers/Packages-controller')

module.exports = function (app) {
    app
        .get('/api/package/:packageId', getPackageCont)
        .get('/api/packages', getAllPackagesCont)
        .post('/api/package/:packageId/edit',editPackageByIdCont)
        .post('/api/package/create',createPackageCont)
        .delete('/api/package/:packageId/delete',deletePackageCont)
        .delete('/api/packages/packagesList/delete',deleteAllPackagesFromListCont)
        
}