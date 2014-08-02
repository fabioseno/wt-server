/*global module, require*/
module.exports = function (app) {
    'use strict';
    
    var defaultController = require('../controllers/default'),
        authController = require('../controllers/auth'),
        authenticationMiddleware = require('../middlewares/authentication');
    
    app.all('*', defaultController.all, authenticationMiddleware.isLoggedIn);
    app.get('/', defaultController.root);
    app.post('/login', authController.login);
    //app.get('/logout', authController.logout);
};