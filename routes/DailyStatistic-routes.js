const {
    getDailyStatisticCont,
    deleteDailyStatisticCont,
    editdailyStatisticCont,
    createDailyStatisticCont,
    getAllDailyStatisticPackagesCont,
    getAllDailyStatisticCont,
} = require('../controllers/DailyStatistic-controller')

module.exports = function (app) {
    app
        .get('/api/DailyStatistic/:DailyStatisticId', getDailyStatisticCont)
        .get('/api/DailyStatistics',getAllDailyStatisticCont )
        .get('/api/categorys/packages',getAllDailyStatisticPackagesCont )
        .post('/api/category/:DailyStatisticId/edit',editdailyStatisticCont)
        .post('/api/category/create',createDailyStatisticCont)
        .delete('/api/category/:DailyStatisticId/delete',deleteDailyStatisticCont)
        
}