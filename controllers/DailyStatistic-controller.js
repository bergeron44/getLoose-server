const DailyStatisticService = require('../services/DailyStatistic-services');

// Create a new Daily Statistic
exports.createDailyStatisticCont = async (req, res) => {
    try {
        const dailyStatistic = await DailyStatisticService.createDailyStatistic(req.body);
        res.status(201).json(dailyStatistic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Daily Statistics
exports.getAllDailyStatisticCont = async (req, res) => {
    try {
        const dailyStatistics = await DailyStatisticService.getDailyStatistics();
        res.status(200).json(dailyStatistics);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a Daily Statistic by ID
exports.getDailyStatisticCont = async (req, res) => {
    try {
        const dailyStatistic = await DailyStatisticService.getDailyStatisticById(req.params.id);
        if (!dailyStatistic) {
            return res.status(404).json({ message: 'DailyStatistic not found' });
        }
        res.status(200).json(dailyStatistic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a Daily Statistic by ID
exports.editDailyStatisticCont = async (req, res) => {
    try {
        const dailyStatistic = await DailyStatisticService.updateDailyStatistic(req.params.id, req.body);
        if (!dailyStatistic) {
            return res.status(404).json({ message: 'DailyStatistic not found' });
        }
        res.status(200).json(dailyStatistic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Daily Statistic by ID
exports.deleteDailyStatisticCont = async (req, res) => {
    try {
        const result = await DailyStatisticService.deleteDailyStatistic(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'DailyStatistic not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Daily Statistic packages
exports.getAllDailyStatisticPackagesCont = async (req, res) => {
    try {
        // Assuming there's a method in your service to get packages
        const packages = await DailyStatisticService.getAllDailyStatisticPackages();
        res.status(200).json(packages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
