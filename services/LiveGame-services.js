const LiveGames = require('../models/LiveGame');
const mongoose = require('mongoose');

const getLiveGame = (liveGameName) => {
    return LiveGames.findOne({ gameType: liveGameName });
};

const getLiveGameById = (liveGameId) => {
    return LiveGames.findById(liveGameId);
};

// Added by Asaf
const getLiveGameByBarAndTableNumber = (barId, tableNumber) => {
    return LiveGames.findOne({ bar: barId, tableNumber: tableNumber });
};

// Done by Asaf
const getAllLiveGamesWithSameAttribute = (attribute, whatToCheck) => {
    return LiveGames.find({ [attribute]: whatToCheck });
};

const getAllLiveGames = () => {
    return LiveGames.find({});
};

const addLiveGame = (liveGameObject) => {
    const newLiveGame = new LiveGames(liveGameObject);
    return newLiveGame.save();
};

const removeLiveGameFromDataBase = (liveGameId) => {
    return LiveGames.findByIdAndDelete(liveGameId); // Updated method name
}


const removeAllLiveGamesFromThisList = (liveGameListIdentifiers) => {
    return Promise.all(
        liveGameListIdentifiers.map(async (identifier) => {
            let result = null;

            // Check if the identifier is a valid ObjectId
            if (mongoose.Types.ObjectId.isValid(identifier)) {
                // Attempt to remove by ID
                result = await LiveGames.findByIdAndDelete(identifier);
            }

            // If not found by ID or the identifier is not an ObjectId, try removing by name
            if (!result) {
                result = await LiveGames.findOneAndDelete({ gameType: identifier });
            }

            // Return the result or null if not found
            return result;
        })
    ).then(results => {
        // Filter out nulls and return an array of removed documents
        return results.filter(result => result !== null);
    });
};

const updateLiveGameById = (liveGameId, newContent) => {
    return LiveGames.findByIdAndUpdate(liveGameId, newContent, { new: true });
};

module.exports = {
    getLiveGame,
    getLiveGameById,
    getAllLiveGamesWithSameAttribute,
    getAllLiveGames,
    addLiveGame,
    removeLiveGameFromDataBase,
    removeAllLiveGamesFromThisList,
    updateLiveGameById,
    getLiveGameByBarAndTableNumber
};
