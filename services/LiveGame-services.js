const LiveGames = require('../models/LiveGame');

const getLiveGame = (liveGameName) => {
    return LiveGames.findOne({ liveGameName });
}

const getLiveGameById = (liveGameId) => {
    return LiveGames.findOne({ _id: liveGameId });
}

const getAllLiveGamesWithSameAttribute = (attribute, whatToCheck) => {
    return LiveGames.find({ [attribute]: whatToCheck });
}//get an attribute and bring back all the objects with the same attribute

const getAllLiveGames = () => {
    return LiveGames.find({});
}

const addLiveGame = (liveGameObject) => {
    const newLiveGame = new LiveGames(liveGameObject);
    return newLiveGame.save();
}

const removeLiveGameFromDataBase = (liveGameName) => {
    return LiveGames.findOneAndRemove({ liveGameName });
}

const removeAllLiveGamesFromThisList = (liveGameListNames) => {
    liveGameListNames.forEach(liveGameName => {
        LiveGames.findOneAndRemove({ liveGameName });
    });
}

const updateLiveGame = (liveGameName, newContent) => {
    return LiveGames.findOneAndUpdate({ liveGameName }, newContent, { new: true });
}

const updateLiveGameById = (liveGameId, newContent) => {
    return LiveGames.findOneAndUpdate({ _id: liveGameId }, newContent, { new: true });
}

module.exports = {
    getLiveGame,
    getLiveGameById,
    getAllLiveGamesWithSameAttribute,
    getAllLiveGames,
    addLiveGame,
    removeLiveGameFromDataBase,
    removeAllLiveGamesFromThisList,
    updateLiveGame,
    updateLiveGameById
};
