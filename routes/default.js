/*global module, require*/
module.exports = function (app) {
    'use strict';
    
    var defaultController = require('../controllers/default');
    
    // enabling CORS
    app.all('*', defaultController.all);
    app.get('/', defaultController.root);
    
};