const {
    getQuestionCont,
    getAllQuestionsCont,
    getCategoryQuestionsCont,
    getGameQuestionsCont,
    addQuestionCont,
    removeQuestionCont,
    updateDifficultCont,
    updateQuestionUseCont
} = require('../controllers/Questions-controller');

module.exports = function (app) {
    // GET routes
    app.get('/api/questions/:questionId', getQuestionCont);
    app.get('/api/questions', getAllQuestionsCont);
    app.get('/api/questions/category/:categoryName', getCategoryQuestionsCont);
    app.get('/api/questions/game/:gameCat', getGameQuestionsCont);

    // POST routes
    app.post('/api/questions', addQuestionCont);
    app.post('/api/questions/:questionId/:succeed', updateQuestionUseCont);
    app.post('/api/questions/difficulty', updateDifficultCont);

    // DELETE routes
    app.delete('/api/questions/:questionId', removeQuestionCont);
}