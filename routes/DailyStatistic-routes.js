const {
    getDailyStatisticCont,
    deleteDailyStatisticCont,
    editDailyStatisticCont,
    createDailyStatisticCont,
    getAllDailyStatisticPackagesCont,
    getAllDailyStatisticCont,
} = require('../controllers/DailyStatistic-controller');

module.exports = function (app) {
    // GET routes
    app.get('/api/daily-statistics/:id', getDailyStatisticCont); // Use :id for dynamic parameter
    app.get('/api/daily-statistics', getAllDailyStatisticCont);
    app.get('/api/daily-statistics/packages', getAllDailyStatisticPackagesCont); // Adjusted path for consistency

    // POST routes
    app.post('/api/daily-statistics', createDailyStatisticCont); // Use POST for creation
    app.put('/api/daily-statistics/:id', editDailyStatisticCont); // Use PUT for updates

    // DELETE routes
    app.delete('/api/daily-statistics/:id', deleteDailyStatisticCont); // Consistent use of :id
};
