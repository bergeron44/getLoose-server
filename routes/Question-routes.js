const {
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
} = require('../controllers/Questions-controller');

module.exports = function (app) {
    // GET routes
    app.get('/api/questions/:questionId', getQuestionCont);
    app.get('/api/questions', getAllQuestionsCont);
    app.get('/api/questions/category/:categoryName', getCategoryQuestionsCont);
    app.get('/api/questions/game/:gameCat', getGameQuestionsCont);
    app.get('/api/questions/filtered', getFilteredQuestionsCont); // Updated to match endpoint
    app.get('/api/questions/rate-range', getQuestionsByRateRangeCont); // Updated to match endpoint

    // POST routes
    app.post('/api/questions', addQuestionCont);
    app.post('/api/questions/:questionId/:succeed', updateQuestionUseCont);
    app.post('/api/questions/difficulty', updateDifficultCont);

    app.put('/api/questions/update/:id', updateQuestionCont);

    // DELETE routes
    app.delete('/api/questions/:questionId', removeQuestionCont);
}
