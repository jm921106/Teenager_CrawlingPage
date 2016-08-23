
var controller = require('../controllers/tab.server.controller.js');

exports.route = function (app) {
    app.get('/', controller.home);
    app.get('/tab_home', controller.home);
    app.get('/tab_info_study', controller.info_study);
    app.get('/tab_info_members', controller.info_members);
    app.get('/tab_service_QOL', controller.QOL);
    app.get('/tab_service_standard', controller.standard);
    app.get('/tab_graph', controller.graph);
};