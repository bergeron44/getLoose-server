const {
  getQuestion,
  getAllQuestions,
  getAttributeQuestions,
  addQuestion,
  removeQuestion,
  updateDifficult,
  updateQuestionUse

} = require('../services/Questions-services')
const serverResponse = require('../utils/serverResponse')

const getQuestionCont = async (req, res) => {
    try{
        const question = await getQuestion(req.params.questionId)

        if(!question){
            return serverResponse(res, 404, { message: "no question found"})
        }

        return serverResponse(res, 200, question)
    } catch(e){
        console.log(e)
        return serverResponse(res, 500, {message: 'internal error occured while trying to get Question'})
    }
}
const getAllQuestionsCont = async (req, res) => {
  try{
      const allquestion = await getAllQuestions()

      if(!allquestion){
          return serverResponse(res, 404, { message: "no questions found"})
      }

      return serverResponse(res, 200, allquestion)
  } catch(e){
      console.log(e)
      return serverResponse(res, 500, {message: 'internal error occured while trying to get all Questions'})
  }
}
const getCategoryQuestionsCont = async (req, res) => {
    try {
      const categoryQuestions= await getAttributeQuestions(category, req.params.categoryName)
      if (!categoryQuestions) {
        return serverResponse(res, 404, {
          message: 'There are no questions in that category'
        });
      }
      return serverResponse(res, 200,categoryQuestions);
    } catch (e) {
      console.log(e)
      return serverResponse(res, 500, {message: 'internal error occured while trying to get this category Questions'})
    }
  };
  const getGameQuestionsCont = async (req, res) => {
    try {
        const { gameCat } = req.params;

        // Use the `getAttributeQuestions` function from the service layer
        const questions = await getAttributeQuestions('game', gameCat);
        
        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for this game category" });
        }

        return res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

  const addQuestionCont = async (req, res) =>{
    try{
      const addQuestionConst = {...req.body}
      if(addQuestionConst.answer === ""||addQuestionConst.question===""){
          return serverResponse(res, 404, { message: "unable to add new question because you provided no question or answer"})
      }

          const newQuestionOb = await addQuestion(addQuestionConst)
          if(!newQuestionOb){
              return serverResponse(res, 404, { message: "unable to add new question"})
          }
          return serverResponse(res, 200, newQuestionOb)

  } catch(e){
      console.log(e)
      return serverResponse(res, 500, {message: 'internal error occurred while trying to add question'})
  }
  };

const removeQuestionCont =async (req,res) =>{
  try {
    const question= await getQuestion(req.params.questionId)
    if (!question) {
         return serverResponse(res, 404, { message: "question does not exsist" });
      }
      const remove = await removeQuestion(req.params.questionId);

   return serverResponse(res, 200,  {
     message: 'question :'+remove
   });
 } catch (e) {
   return serverResponse(res, 500, {
     message: 'interrnel error trying to delete'
   });
 }
};
  const updateDifficultCont = async (req, res) => {
    const table =getAllQuestions();
    try{
        for (const row of table){
            const newDifficult= (row.successRate / row.appearance)%10;
            const updated=await updateDifficult(row._id,newDifficult);
            if(!updated){
              return serverResponse(res, 404, { message: "question:"+row.question+" was not update" });
            }
        }
        return serverResponse(res, 200,  {
          message: "all questions were update"
        });
    }
    catch(e){
      return serverResponse(res, 500, {
        message: 'interrnel error trying to updating'
      });
    }
  };

  const updateQuestionUseCont=async (req,res)=>{
    try {
      const updated=await updateQuestionUse(req._id,req.succeed);
      if (!updated) {
        return serverResponse(res, 404, { message: "question:"+row.question+" was not update" });
      }
      return serverResponse(res, 200,  {
        message: "question:"+req._id+" was update"
      });
    } catch (e) {
      return serverResponse(res, 500, {
        message: 'interrnel error trying to updating'
      });
    }
  };

  // In your controllers/Questions-controller.js

const getFilteredQuestionsCont = async (req, res) => {
  try {
    const { difficulty, game } = req.query;

    if (!difficulty || !game) {
      return res.status(400).json({ message: 'Difficulty and game type are required' });
    }

    const questions = await getFilteredQuestions(difficulty, game);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for the given criteria' });
    }

    return res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
    getQuestionCont,
    getAllQuestionsCont,
    getCategoryQuestionsCont,
    getGameQuestionsCont,
    addQuestionCont,
    removeQuestionCont,
    updateDifficultCont,
    updateQuestionUseCont,
    getFilteredQuestionsCont
}