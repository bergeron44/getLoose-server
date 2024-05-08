const {
    getBarByNameCont,
    getBarByIdCont,
    deleteBarByNameCont,
    createBarCont,
    editBarCont,
    getAllBarsNamesCont,
    getAllBarssCont,
} = require('../controllers/Bars-controller')

module.exports = function (app) {
    app
        .get('/api/bar/:barName', getBarByNameCont)
        .get('/api/bars', getAllBarssCont)
        .get('/api/bar/:barId', getBarByIdCont)
        .get('/api/bars/names', getAllBarsNamesCont)
        .post('/api/bar/:barName/edit/name',editBarCont)
        .post('/api/bar/:barId/edit',editBarCont)
        .post('/api/bar/create',createBarCont)
        .delete('/api/bar/:barName/delete',deleteBarByNameCont)
        
}