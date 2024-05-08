const {
    getQuestionCont,
    getAllQuestionsCont,
    getCategoryQuestionsCont,
    getGameQuestionsCont,
    addQuestionCont,
    removeQuestionCont,
    updateDifficultCont,
    updateQuestionUseCont
} = require('../controllers/Questions-controller')
module.exports = function (app){
    app
        .get('/api/question/:questionId', getQuestionCont)
        .get('/api/questions', getAllQuestionsCont)
        .get('/api//questions/:categoryName', getCategoryQuestionsCont)
        .get('/api/questions/:gameCat', getGameQuestionsCont)
        .post('/api/question/:question',addQuestionCont)
        .post('/api/question/:questionId/:succeed',updateQuestionUseCont)
        .post('/api/questions',updateDifficultCont)
        .delete('/api/question/:questionId',removeQuestionCont);
        
};