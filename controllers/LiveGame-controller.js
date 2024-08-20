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
  
  const getLiveGame = async (req, res) => {
      try{
          const livegame = await getLiveGame(req.params.livegameName)
  
          if(!livegame){
              return serverResponse(res, 404, { message: "no livegame found"})
          }
  
          return serverResponse(res, 200, livegame)
      } catch(e){
          console.log(e)
          return serverResponse(res, 500, {message: 'internal error occured while trying to get livegame'})
      }
  };
  const getLiveGameById = async (req, res) => {
    try{
        const livegame = await getLiveGameById(req.params.livegameId)

        if(!livegame){
            return serverResponse(res, 404, { message: "no livegame found"})
        }

        return serverResponse(res, 200, livegame)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get livegame'})
    }
};
  const getAllLiveGames = async (req, res) => {
    try{
        const LiveGames = await getAllLiveGames()
  
        if(!LiveGames){
            return serverResponse(res, 404, { message: "no LiveGames found"})
        }
  
        return serverResponse(res, 200, LiveGames)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get all LiveGames'})
    }
  };
  const getAllLiveGamesWithSameAttribute = async (req, res) => {
      try {
        const attributeLiveGame= await getAllLiveGamesWithSameAttribute(attribute, req.params.value)
        if (!attributeLiveGame) {
          return serverResponse(res, 404, {
            message: 'There are no LiveGame with that attribute'
          });
        }
        return serverResponse(res, 200,attributeLiveGame);
      } catch (e) {
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get this attribute LiveGame'})
      }
    };
    const getLiveGameByBarAndTableNumber = async (req, res) => {
        try {
          const livegame= await getLiveGameByBarAndTableNumber(req.params.barId, req.params.tableNumber)
          if (!livegame) {
            return serverResponse(res, 404, {
              message: 'There are no LiveGame with that barId and tableNumber'
            });
          }
          return serverResponse(res, 200,livegame);
        } catch (e) {
          console.log(e)
          return serverResponse(res, 500, {message: 'internal error occured while trying to get this LiveGame'})
        }
      };
  
    const addLiveGame = async (req, res) =>{
      try{
        const addLiveGameParam = {...req.body}
        if(addLiveGameParam.bar === ""||addLiveGameParam.tableNumber===""){
            return serverResponse(res, 404, { message: "unable to add new addLiveGame because you provided no bar or tableNumber"})
        }
  
            const newLiveGameOb = await addLiveGame(addLiveGameParam)
            if(!newLiveGameOb){
                return serverResponse(res, 404, { message: "unable to add new livegame"})
            }
            return serverResponse(res, 200, newLiveGameOb)
  
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occurred while trying to add livegame'})
    }
    };
  
  const removeLiveGameFromDataBase =async (req,res) =>{
    try {
      const livegame= await getLiveGameById(req.params._id)
      if (!livename) {
           return serverResponse(res, 404, { message: "livename does not exsist" });
        }
        const remove = await removeLiveGameFromDataBase(req.params._id);
  
     return serverResponse(res, 200,  {
       message: 'livegame :'+remove
     });
   } catch (e) {
     return serverResponse(res, 500, {
       message: 'interrnel error trying to delete'
     });
   }
  };
  const removeAllLiveGamesFromThisList = async (req, res) => {
    try {
        const remove = await removeAllLiveGamesFromThisList();
  
     return serverResponse(res, 200,  {
       message: 'livegame :'+remove
     });
   } catch (e) {
     return serverResponse(res, 500, {
       message: 'interrnel error trying to delete'
     });
   }
  };
    const updateLiveGameById = async (req, res) => {
      try {
        const updated=await updateLiveGameById(req._id,req.newContent);
        if (!updated) {
          return serverResponse(res, 404, { message: "livegame:"+row._id+" was not update" });
        }
        return serverResponse(res, 200,  {
          message: "livegame:"+req._id+" was update"
        });
      } catch (e) {
        return serverResponse(res, 500, {
          message: 'interrnel error trying to updating'
        });
      }
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
  }