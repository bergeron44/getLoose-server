const {
    getLiveGameCont,
    getLiveGameByIdCont,
    getAllLiveGamesWithSameAttributeCont,
    getAllLiveGamesCont,
    addLiveGameCont,
    removeLiveGameFromDataBaseCont,
    removeAllLiveGamesFromThisListCont,
    updateLiveGameByIdCont,
    getLiveGameByBarAndTableNumberCont
} = require('../controllers/LiveGame-controller')
module.exports = function (app) {
    app
        .get('/api/livegame/:livegameName', getLiveGameCont)
        .get('/api/livegame/:livegameId', getLiveGameByIdCont)
        .get('/api//livegame/:attribute/:value', getAllLiveGamesWithSameAttributeCont)
        .get('/api/livegame', getAllLiveGamesCont)
        .post('/api/livegame/:livegame', addLiveGameCont)
        .delete('/api/livegame/:liveGameId', removeLiveGameFromDataBaseCont)
        .delete('/api/livegame', removeAllLiveGamesFromThisListCont)
        .post('/api/livegame/:livenameId/:livegame', updateLiveGameByIdCont,)
        .get('/api/livegame/:bar/:tableNumber', getLiveGameByBarAndTableNumberCont);

};