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
} = require('../controllers/LiveGame-controller');

module.exports = function (app) {

    // Route to get a live game by its name
    app.get('/api/livegame/name/:livegameName', getLiveGameCont);

    // Route to get a live game by its ID
    app.get('/api/livegame/id/:livegameId', getLiveGameByIdCont);

    // Route to get all live games with a specific attribute and value
    app.get('/api/livegame/attribute/:attribute/value/:value', getAllLiveGamesWithSameAttributeCont);

    // Route to get all live games
    app.get('/api/livegame', getAllLiveGamesCont);

    // Route to add a new live game
    app.post('/api/livegame', addLiveGameCont);

    // Route to remove a live game by its ID
    app.delete('/api/livegame/:liveGameId', removeLiveGameFromDataBaseCont);

    // Route to remove all live games (ensure this route is safe to use)
    app.delete('/api/livegame', removeAllLiveGamesFromThisListCont);

    // Route to update a live game by its ID
    app.put('/api/livegame/:liveGameId', updateLiveGameByIdCont);

    // Route to get a live game by bar ID and table number
    app.get('/api/livegame/bar/:barId/table/:tableNumber', getLiveGameByBarAndTableNumberCont);

};

// const {
//     getLiveGameCont,
//     getLiveGameByIdCont,
//     getAllLiveGamesWithSameAttributeCont,
//     getAllLiveGamesCont,
//     addLiveGameCont,
//     removeLiveGameFromDataBaseCont,
//     removeAllLiveGamesFromThisListCont,
//     updateLiveGameByIdCont,
//     getLiveGameByBarAndTableNumberCont
// } = require('../controllers/LiveGame-controller')
// module.exports = function (app) {
//     app
//         .get('/api/livegame/:livegameName', getLiveGameCont)
//         .get('/api/livegame/:livegameId', getLiveGameByIdCont)
//         .get('/api//livegame/:attribute/:value', getAllLiveGamesWithSameAttributeCont)
//         .get('/api/livegame', getAllLiveGamesCont)
//         .post('/api/livegame/:livegame', addLiveGameCont)
//         .delete('/api/livegame/:liveGameId', removeLiveGameFromDataBaseCont)
//         .delete('/api/livegame', removeAllLiveGamesFromThisListCont)
//         .post('/api/livegame/:livenameId/:livegame', updateLiveGameByIdCont,)
//         .get('/api/livegame/:bar/:tableNumber', getLiveGameByBarAndTableNumberCont);

// };