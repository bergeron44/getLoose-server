const DailyStatistic = require('../models/DailyStatistic');

exports.createDailyStatistic = async (data) => {
    const dailyStatistic = new DailyStatistic(data);
    return await dailyStatistic.save();
};

exports.getDailyStatistics = async () => {
    return await DailyStatistic.find().populate('bar').populate('package');
};

exports.getDailyStatisticById = async (id) => {
    return await DailyStatistic.findById(id).populate('bar').populate('package');
};

exports.updateDailyStatistic = async (id, data) => {
    return await DailyStatistic.findByIdAndUpdate(id, data, { new: true }).populate('bar').populate('package');
};

exports.deleteDailyStatistic = async (id) => {
    return await DailyStatistic.findByIdAndDelete(id);
};
