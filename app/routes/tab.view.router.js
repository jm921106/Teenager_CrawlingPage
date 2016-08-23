var task = require('../controllers/view.server.controller.js');

exports.route = function (app) {
    app.get('/tab_view', task.view);
    app.post('/tab_view', task.select);
    app.post('/insert', task.insert);
};