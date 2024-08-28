const {
    getDailyStatisticCont,
    deleteDailyStatisticCont,
    editdailyStatisticCont,
    createDailyStatisticCont,
    getAllDailyStatisticPackagesCont,
    getAllDailyStatisticCont,
} = require('../controllers/DailyStatistic-controller');

module.exports = function (app) {
    // GET routes
    app.get('/api/DailyStatistics/:DailyStatisticId', getDailyStatisticCont);
    app.get('/api/DailyStatistics', getAllDailyStatisticCont);
    app.get('/api/categorys/packages', getAllDailyStatisticPackagesCont);

    // POST routes
    app.post('/api/categorys/:DailyStatisticId/edit', editdailyStatisticCont);
    app.post('/api/categorys/create', createDailyStatisticCont);

    // DELETE routes
    app.delete('/api/categorys/:DailyStatisticId/delete', deleteDailyStatisticCont);
};