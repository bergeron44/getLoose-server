// routes/index.js
module.exports = function (app) {
    require('./Question-routes')(app);
    require('./Bars-routes')(app);
    require('./DailyStatistic-routes')(app);
    require('./Packages-routes')(app);
    require('./LiveGame-routes')(app);
    require('./Ip-routes')(app); // Add this if you have an Ip-routes file
};
