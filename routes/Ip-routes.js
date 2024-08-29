const express = require('express');
const router = express.Router();

router.get('/api/ip', (req, res) => {
    res.json({ ipAddress: req.clientIp });
});

module.exports = function (app) {
    app.use('/', router); // Ensure the router is used correctly
};
