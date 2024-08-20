const {
    getLiveGame,
    getLiveGameById,
    getAllLiveGamesWithSameAttribute,
    getAllLiveGames,
    addLiveGame,
    removeLiveGameFromDataBase,
    removeAllLiveGamesFromThisList,
    updateLiveGameById,
    getLiveGameByBarAndTableNumber
} = require('../controllers/LiveGame-controller')
module.exports = function (app) {
    app
        .get('/api/livegame/:livegameName', getLiveGame)
        .get('/api/livegame/:livegameId', getLiveGameById)
        .get('/api//livegame/:attribute/:value', getAllLiveGamesWithSameAttribute)
        .get('/api/livegame', getAllLiveGames)
        .post('/api/livegame/:livegame', addLiveGame)
        .delete('/api/livegame/:liveGameId', removeLiveGameFromDataBase)
        .delete('/api/livegame', removeAllLiveGamesFromThisList)
        .post('/api/livegame/:livenameId/:livegame', updateLiveGameById,)
        .get('/api/livegame/:bar/:tableNumber', getLiveGameByBarAndTableNumber);

};