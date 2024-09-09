const Questions = require('../models/Questions');

const getQuestion = (questionId) => {
    return Questions.findById(questionId).exec();
};

const getAllQuestions = () => {
    return Questions.find({}).exec();
};

const getAttributeQuestions = (attribute, category) => {
    return Questions.find({ [attribute]: category }).exec();
};

const addQuestion = (questionsObject) => {
    const newQuestion = new Questions(questionsObject);
    return newQuestion.save();
};

const removeQuestion = (questionId) => {
    return Questions.findByIdAndRemove(questionId).exec();
};

const updateDifficult = (questionId, newDifficult) => {
    return Questions.findByIdAndUpdate(questionId, { difficult: newDifficult }).exec();
};

const updateQuestionUse = async (questionId, success) => {
    const question = await getQuestion(questionId);
    if (!question) return null;

    const newAppearance = question.appearance + 1;
    const newSuccessRate = success ? question.successRate + 1 : question.successRate;

    return Questions.findByIdAndUpdate(questionId, { appearance: newAppearance, successRate: newSuccessRate }).exec();
};

const getFilteredQuestions = (difficulty, game) => {
    return Questions.find({ difficulty, game }).exec();
};
const updateQuestionById = (id, updateData) =>{
    try {
        // Find and update the question by ID
        const updatedQuestion =  Questions.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        
        // Check if the question was found and updated
        if (!updatedQuestion) {
            throw new Error('Question not found');
        }
        
        return updatedQuestion;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getQuestion,
    getAllQuestions,
    getAttributeQuestions,
    addQuestion,
    removeQuestion,
    updateDifficult,
    updateQuestionUse,
    getFilteredQuestions,
    updateQuestionById
};
