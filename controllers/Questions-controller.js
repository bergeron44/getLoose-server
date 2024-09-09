const {
  getQuestion,
  getAllQuestions,
  getAttributeQuestions,
  addQuestion,
  removeQuestion,
  updateDifficult,
  updateQuestionUse,
  getFilteredQuestions,
  updateQuestionById,
} = require('../services/Questions-services');
const serverResponse = require('../utils/serverResponse');

const getQuestionCont = async (req, res) => {
    try {
        const question = await getQuestion(req.params.questionId);

        if (!question) {
            return serverResponse(res, 404, { message: "No question found" });
        }

        return serverResponse(res, 200, question);
    } catch (e) {
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to get the question' });
    }
};

const getAllQuestionsCont = async (req, res) => {
    try {
        const allQuestions = await getAllQuestions();

        if (!allQuestions || allQuestions.length === 0) {
            return serverResponse(res, 404, { message: "No questions found" });
        }

        return serverResponse(res, 200, allQuestions);
    } catch (e) {
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to get all questions' });
    }
};

const getCategoryQuestionsCont = async (req, res) => {
    try {
        const categoryQuestions = await getAttributeQuestions('category', req.params.categoryName);

        if (!categoryQuestions || categoryQuestions.length === 0) {
            return serverResponse(res, 404, { message: 'There are no questions in that category' });
        }

        return serverResponse(res, 200, categoryQuestions);
    } catch (e) {
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to get questions in this category' });
    }
};

const getGameQuestionsCont = async (req, res) => {
    try {
        const questions = await getAttributeQuestions('game', req.params.gameCat);

        if (!questions || questions.length === 0) {
            return serverResponse(res, 404, { message: "No questions found for this game category" });
        }

        return serverResponse(res, 200, questions);
    } catch (error) {
        console.error(error);
        return serverResponse(res, 500, { message: "Internal server error" });
    }
};

const addQuestionCont = async (req, res) => {
    try {
        const { answer, question } = req.body;

        if (!answer || !question) {
            return serverResponse(res, 400, { message: "Question and answer are required" });
        }

        const newQuestion = await addQuestion(req.body);

        return serverResponse(res, 201, newQuestion);
    } catch (e) {
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to add the question' });
    }
};

const removeQuestionCont = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const question = await getQuestion(questionId);

        if (!question) {
            return serverResponse(res, 404, { message: "Question does not exist" });
        }

        await removeQuestion(questionId);
        return serverResponse(res, 200, { message: 'Question successfully deleted' });
    } catch (e) {
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to delete the question' });
    }
};

const updateDifficultCont = async (req, res) => {
    try {
        const allQuestions = await getAllQuestions();

        for (const question of allQuestions) {
            const newDifficult = (question.successRate / question.appearance) % 10;
            await updateDifficult(question._id, newDifficult);
        }

        return serverResponse(res, 200, { message: "All questions were updated" });
    } catch (e) {
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to update difficulties' });
    }
};

const updateQuestionUseCont = async (req, res) => {
    try {
        const { questionId, succeed } = req.params;
        const updated = await updateQuestionUse(questionId, succeed === 'true');

        if (!updated) {
            return serverResponse(res, 404, { message: "Question not updated" });
        }

        return serverResponse(res, 200, { message: `Question ${questionId} was updated` });
    } catch (e) {
        console.error(e);
        return serverResponse(res, 500, { message: 'Internal error occurred while trying to update the question usage' });
    }
};

const getFilteredQuestionsCont = async (req, res) => {
  try {
      const { difficulty, game } = req.query;

      if (!difficulty || !game) {
          return res.status(400).json({ message: 'Both difficulty and game type are required' });
      }

      // Query the database with parameters
      const questions = await getFilteredQuestions(difficulty, game);

      if (questions.length === 0) {
          return res.status(404).json({ message: 'No questions found for the given criteria' });
      }

      return res.status(200).json(questions);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};
const getQuestionsByRateRangeCont = async (req, res) => {
    try {
        const { minRate, maxRate } = req.query;

        if (minRate === undefined || maxRate === undefined) {
            return serverResponse(res, 400, { message: 'Both minRate and maxRate are required' });
        }

        const min = parseFloat(minRate);
        const max = parseFloat(maxRate);

        if (isNaN(min) || isNaN(max) || min < 0 || max > 5 || min > max) {
            return serverResponse(res, 400, { message: 'Invalid rate range. Rates should be between 0 and 5, and minRate should be less than or equal to maxRate.' });
        }

        const questions = await Questions.find({ rate: { $gte: min, $lte: max } });

        if (!questions || questions.length === 0) {
            return serverResponse(res, 404, { message: 'No questions found within the specified rate range' });
        }

        return serverResponse(res, 200, questions);
    } catch (error) {
        console.error(error);
        return serverResponse(res, 500, { message: 'Internal server error' });
    }
};

async function updateQuestionCont(req, res) {
    const { id } = req.params; // Extract the question ID from the request parameters
    const updateData = req.body; // Extract the update data from the request body

    try {
        const updatedQuestion = await updateQuestionById(id, updateData);
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {
    getQuestionCont,
    getAllQuestionsCont,
    getCategoryQuestionsCont,
    getGameQuestionsCont,
    addQuestionCont,
    removeQuestionCont,
    updateDifficultCont,
    updateQuestionUseCont,
    getFilteredQuestionsCont,
    getQuestionsByRateRangeCont,
    updateQuestionCont
};
