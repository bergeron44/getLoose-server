const LiveGames = require('../models/LiveGame');

const getLiveGame = (liveGameName) => {
    return LiveGames.findOne({ liveGameName });
}

const getLiveGameById = (liveGameId) => {
    return LiveGames.findOne({ _id: liveGameId });
}

//added by asaf
const getLiveGameByBarAndTableNumber=(barId,tableNumber)=>{
    return LiveGames.findOne({bar:barId,tableNumber:tableNumber});
}

//done by asaf

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

const removeLiveGameFromDataBase = (liveGameId) => {
    return LiveGames.findOneAndRemove({ liveGameId });
}

const removeAllLiveGamesFromThisList = (liveGameListNames) => {
    liveGameListNames.forEach(liveGameName => {
        LiveGames.findOneAndRemove({ liveGameName });
    });
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
    updateLiveGameById,
    getLiveGameByBarAndTableNumber
};
