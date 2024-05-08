module.exports = function (app) {
    require('./Question-routes')(app)
    require('./Bars-routes')(app)
    require('./DailyStatistic-routes')(app)
    require('./Packages-routes')(app)
};
