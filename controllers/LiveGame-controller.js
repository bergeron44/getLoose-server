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
  } = require('../services/LiveGame-services');
  const serverResponse = require('../utils/serverResponse');
  //not nesesry in the end fix it too get all live game with same game
  const getLiveGameCont = async (req, res) => {
    try {
      const livegame = await getLiveGame(req.params.livegameName);
      if (!livegame) {
        return serverResponse(res, 404, { message: "No live game found" });
      }
      return serverResponse(res, 200, livegame);
    } catch (e) {
      console.log(e);
      return serverResponse(res, 500, { message: 'Internal error occurred while trying to get live game' });
    }
  };
  //not nessesry
  
  const getLiveGameByIdCont = async (req, res) => {
    try {
      const livegame = await getLiveGameById(req.params.livegameId);
      if (!livegame) {
        return serverResponse(res, 404, { message: "No live game found" });
      }
      return serverResponse(res, 200, livegame);
    } catch (e) {
      console.log(e);
      return serverResponse(res, 500, { message: 'Internal error occurred while trying to get live game' });
    }
  };
  
  const getAllLiveGamesCont = async (req, res) => {
    try {
      const liveGames = await getAllLiveGames();
      return serverResponse(res, 200, liveGames);
    } catch (e) {
      console.log(e);
      return serverResponse(res, 500, { message: 'Internal error occurred while trying to get all live games' });
    }
  };
  
  const getAllLiveGamesWithSameAttributeCont = async (req, res) => {
    try {
      const attributeLiveGame = await getAllLiveGamesWithSameAttribute(req.params.attribute, req.params.value);
      if (attributeLiveGame.length === 0) {
        return serverResponse(res, 404, { message: 'No live games found with that attribute' });
      }
      return serverResponse(res, 200, attributeLiveGame);
    } catch (e) {
      console.log(e);
      return serverResponse(res, 500, { message: 'Internal error occurred while trying to get live games by attribute' });
    }
  };
  
  const getLiveGameByBarAndTableNumberCont = async (req, res) => {
    try {
      const livegame = await getLiveGameByBarAndTableNumber(req.params.barId, req.params.tableNumber);
      if (!livegame) {
        return serverResponse(res, 404, { message: 'No live game found with that barId and tableNumber' });
      }
      return serverResponse(res, 200, livegame);
    } catch (e) {
      console.log(e);
      return serverResponse(res, 500, { message: 'Internal error occurred while trying to get live game by barId and tableNumber' });
    }
  };
  
  const addLiveGameCont = async (req, res) => {
    try {
      const addLiveGameParam = { ...req.body };
      if (!addLiveGameParam.bar || !addLiveGameParam.tableNumber) {
        return serverResponse(res, 400, { message: "Bar and tableNumber are required to add a new live game" });
      }
      const newLiveGameOb = await addLiveGame(addLiveGameParam);
      return serverResponse(res, 201, newLiveGameOb);
    } catch (e) {
      console.log(e);
      return serverResponse(res, 500, { message: 'Internal error occurred while trying to add live game' });
    }
  };
  
  const removeLiveGameFromDataBaseCont = async (req, res) => {
    try {
        const livegame = await getLiveGameById(req.params.liveGameId);
        if (!livegame) {
            return serverResponse(res, 404, { message: "livegame does not exist" });
        }
        const remove = await removeLiveGameFromDataBase(req.params.liveGameId); // Ensure correct parameter usage

        return serverResponse(res, 200, {
            message: 'livegame removed: ' + remove
        });
    } catch (e) {
        console.log(e);
        return serverResponse(res, 500, {
            message: 'internal error trying to delete'
        });
    }
};
  
  const removeAllLiveGamesFromThisListCont = async (req, res) => {
    try {
      const { liveGameListNames } = req.body;
      if (!liveGameListNames || !Array.isArray(liveGameListNames)) {
        return serverResponse(res, 400, { message: 'A list of live game names is required' });
      }
      await removeAllLiveGamesFromThisList(liveGameListNames);
      return serverResponse(res, 200, { message: 'All live games removed' });
    } catch (e) {
      console.log(e);
      return serverResponse(res, 500, { message: 'Internal error occurred while trying to delete all live games' });
    }
  };
  
  const updateLiveGameByIdCont = async (req, res) => {
    try {
      const updated = await updateLiveGameById(req.params.liveGameId, req.body);
      if (!updated) {
        return serverResponse(res, 404, { message: `Live game ${req.params.liveGameId} was not updated` });
      }
      return serverResponse(res, 200, { message: `Live game ${req.params.liveGameId} was updated` });
    } catch (e) {
      console.log(e);
      return serverResponse(res, 500, { message: 'Internal error occurred while trying to update live game' });
    }
  };
  
  module.exports = {
    getLiveGameCont,
    getLiveGameByIdCont,
    getAllLiveGamesWithSameAttributeCont,
    getAllLiveGamesCont,
    addLiveGameCont,
    removeLiveGameFromDataBaseCont,
    removeAllLiveGamesFromThisListCont,
    updateLiveGameByIdCont,
    getLiveGameByBarAndTableNumberCont
  };
  