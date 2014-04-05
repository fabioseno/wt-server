/*global module, require*/
module.exports = function (app) {
    'use strict';
    
    var defaultController = require('../controllers/default'),
        authController = require('../controllers/auth'),
        authenticationMiddleware = require('../middlewares/authentication');
    
    app.all('*', defaultController.all, authenticationMiddleware.isLoggedIn);
    app.post('/login', authController.login);
    //app.get('/', defaultController.root);
    //app.get('/logout', authController.logout);
};