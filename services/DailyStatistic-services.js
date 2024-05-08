const DailyStatistic = require('../models/DailyStatistic')


//get line from data base by some attribute
const getDailyStatistic = (day,bar,package) => {
    return DailyStatistic.findOne({ day:day, bar:bar , package:package });
}
const getDailyStatisticByDay = (day) => {
    return DailyStatistic.findOne({ day: day });
}
const getDailyStatisticByBar= (bar) => {
    return DailyStatistic.findOne({bar:bar})

}
const getDailyStatisticByDate= (date) => {
    return DailyStatistic.findOne({date:date})

}
const getDailyStatisticByPackage= (package) => {
    return DailyStatistic.findOne({package:package})

}
const getDailyStatisticByQuantity= (quantity) => {
    return DailyStatistic.findOne({quantity:quantity})

}
//end
//get line from data base by some attribute
//end
const removeSpacificDailyStatistic=(day,bar,package)=> {
return DailyStatistic.findOneAndRemove({day:day, bar:bar , package:package});
}

//get all row withe specific attribute
const getAllDailyStatisticsWithSameAttribute = (attribute, whatToCheck) => {
    const query = {};
    query[attribute] = whatToCheck;
    return DailyStatistic.find(query);
}//get an attribute and bring baeck all the objects with the same attribute

const getAllDailyStatistics = () => {
    return DailyStatistic.find({})
}

const addDailyStatistic = (dailyStatisticObject) => {
    const newDailyStatistic = new DailyStatistic(dailyStatisticObject);
    return newDailyStatistic.save();
}

const removeDailyStatisticsByAttribute = async (attribute, value) => {
    try {
        const result = await DailyStatistic.deleteMany({ [attribute]: value });
        console.log(`${result.deletedCount} document(s) deleted.`);
        return result;
    } catch (error) {
        console.error('Error removing documents:', error);
        throw error;
    }
}

const updateDailyStatistic = (attribute, value, newContent) => {
    return DailyStatistic.findOneAndUpdate(
        { [attribute]: value }, // Filter: Find the document with the specified attribute and value
        newContent,             // Update: Set the new content
        { new: true }           // Options: Return the modified document
    );
}
const updateDailyStatisticById = (DailyStatisticId, newContent) => {
    return DailyStatistic.findOneAndUpdate({_id:DailyStatistic}, newContent, {new:true})
}

module.exports = {
    getDailyStatistic,
    removeSpacificDailyStatistic,
    
    getDailyStatisticByDay,
    getDailyStatisticByBar,
    getDailyStatisticByDate,
    getDailyStatisticByPackage,
    getDailyStatisticByQuantity,
    getAllDailyStatisticsWithSameAttribute,
    getAllDailyStatistics,
    addDailyStatistic,
    removeDailyStatisticsByAttribute,
    updateDailyStatistic,
    updateDailyStatisticById
}