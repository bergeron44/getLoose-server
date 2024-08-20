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
} = require('../services/LiveGame-services')
const serverResponse = require('../utils/serverResponse')

const getLiveGameCont = async (req, res) => {
  try {
      const livegame = await getLiveGame(req.params.livegameName)

      if (!livegame) {
          return serverResponse(res, 404, { message: "no livegame found" })
      }

      return serverResponse(res, 200, livegame)
  } catch (e) {
      console.log(e)
      return serverResponse(res, 500, { message: 'internal error occurred while trying to get livegame' })
  }
};

const getLiveGameByIdCont = async (req, res) => {
  try {
      const livegame = await getLiveGameById(req.params.livegameId)

      if (!livegame) {
          return serverResponse(res, 404, { message: "no livegame found" })
      }

      return serverResponse(res, 200, livegame)
  } catch (e) {
      console.log(e)
      return serverResponse(res, 500, { message: 'internal error occurred while trying to get livegame' })
  }
};

const getAllLiveGamesCont = async (req, res) => {
  try {
      const LiveGames = await getAllLiveGames()

      if (!LiveGames) {
          return serverResponse(res, 404, { message: "no LiveGames found" })
      }

      return serverResponse(res, 200, LiveGames)
  } catch (e) {
      console.log(e)
      return serverResponse(res, 500, { message: 'internal error occurred while trying to get all LiveGames' })
  }
};

const getAllLiveGamesWithSameAttributeCont = async (req, res) => {
  try {
      const attributeLiveGame = await getAllLiveGamesWithSameAttribute(req.params.attribute, req.params.value)
      if (!attributeLiveGame) {
          return serverResponse(res, 404, {
              message: 'There are no LiveGame with that attribute'
          });
      }
      return serverResponse(res, 200, attributeLiveGame);
  } catch (e) {
      console.log(e)
      return serverResponse(res, 500, { message: 'internal error occurred while trying to get this attribute LiveGame' })
  }
};

const getLiveGameByBarAndTableNumberCont = async (req, res) => {
  try {
      const livegame = await getLiveGameByBarAndTableNumber(req.params.barId, req.params.tableNumber)
      if (!livegame) {
          return serverResponse(res, 404, {
              message: 'There are no LiveGame with that barId and tableNumber'
          });
      }
      return serverResponse(res, 200, livegame);
  } catch (e) {
      console.log(e)
      return serverResponse(res, 500, { message: 'internal error occurred while trying to get this LiveGame' })
  }
};

const addLiveGameCont = async (req, res) => {
  try {
      const addLiveGameParam = { ...req.body }
      if (addLiveGameParam.bar === "" || addLiveGameParam.tableNumber === "") {
          return serverResponse(res, 404, { message: "unable to add new addLiveGame because you provided no bar or tableNumber" })
      }

      const newLiveGameOb = await addLiveGame(addLiveGameParam)
      if (!newLiveGameOb) {
          return serverResponse(res, 404, { message: "unable to add new livegame" })
      }
      return serverResponse(res, 200, newLiveGameOb)

  } catch (e) {
      console.log(e)
      return serverResponse(res, 500, { message: 'internal error occurred while trying to add livegame' })
  }
};

const removeLiveGameFromDataBaseCont = async (req, res) => {
  try {
      const livegame = await getLiveGameById(req.params._id)
      if (!livegame) {
          return serverResponse(res, 404, { message: "livegame does not exist" });
      }
      const remove = await removeLiveGameFromDataBase(req.params._id);

      return serverResponse(res, 200, {
          message: 'livegame removed: ' + remove
      });
  } catch (e) {
      return serverResponse(res, 500, {
          message: 'internal error trying to delete'
      });
  }
};

const removeAllLiveGamesFromThisListCont = async (req, res) => {
  try {
      const remove = await removeAllLiveGamesFromThisList();

      return serverResponse(res, 200, {
          message: 'all livegames removed'
      });
  } catch (e) {
      return serverResponse(res, 500, {
          message: 'internal error trying to delete'
      });
  }
};

const updateLiveGameByIdCont = async (req, res) => {
  try {
      const updated = await updateLiveGameById(req.params._id, req.body);
      if (!updated) {
          return serverResponse(res, 404, { message: "livegame: " + req.params._id + " was not updated" });
      }
      return serverResponse(res, 200, {
          message: "livegame: " + req.params._id + " was updated"
      });
  } catch (e) {
      return serverResponse(res, 500, {
          message: 'internal error trying to update'
      });
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
}
