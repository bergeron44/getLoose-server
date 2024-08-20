const Bars = require('../models/Bars');

const getBar = (barName) => {
    return Bars.findOne({ barName });
};

const getBarById = (BarId) => {
    return Bars.findOne({ _id: BarId });
};

const getAllBarsWithSameAttribute = (attribute, whatToCheck) => {
    return Bars.find({ [attribute]: whatToCheck });
};

const getAllBars = () => {
    return Bars.find({});
};

const addBar = (barObject) => {
    const newBar = new Bars(barObject);
    return newBar.save();
};

const removeBarFromDataBase = (barName) => {
    return Bars.deleteOne({ barName });
};

const removeAllBarsFromThisList = (BarsListNames) => {
    return Bars.deleteMany({ barName: { $in: BarsListNames } });
};

const updateBar = (barName, newContent) => {
    return Bars.findOneAndUpdate({ barName }, newContent, { new: true });
};

const updateBarById = (barId, newContent) => {
    return Bars.findOneAndUpdate({ _id: barId }, newContent, { new: true });
};

module.exports = {
    getBar,
    getBarById,
    getAllBarsWithSameAttribute,
    getAllBars,
    addBar,
    removeBarFromDataBase,
    removeAllBarsFromThisList,
    updateBar,
    updateBarById
};
