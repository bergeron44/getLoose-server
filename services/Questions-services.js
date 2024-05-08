const Questions = require('../models/Questions')

const getQuestion= (questionId) =>{
    return Questions.findOne({_id:questionId})
}

const getAllQuestions=()=>{
    return Questions.find({})
}
const getAttributeQuestions= (attribute, category) =>{
    return Questions.find({[attribute]:category})
}
const addQuestion= (questionsObject) =>{
    newQuestion = new Questions(questionsObject)
    return newQuestion.save()
}
const removeQuestion=(questionId)=>{
    return Questions.findOneAndRemove({questionId})
}

const updateDifficult=(questionId, newDifficult) =>{
            return Questions.findByIdAndUpdate(questionId,{difficult: newDifficult});
}

const updateQuestionUse= (questionId, success) =>{
    const row = getQuestion(questionId);
    if (success) {
        return Questions.findByIdAndUpdate(questionId,{appearance:row.appearance + 1, successRate:row.successRate + 1})
    }
    return Questions.findByIdAndUpdate(questionId,{appearance:row.appearance + 1, successRate:row.successRate})
}
module.exports = {
    getQuestion,
    getAllQuestions,
    getAttributeQuestions,
    addQuestion,
    removeQuestion,
    updateDifficult,
    updateQuestionUse
}