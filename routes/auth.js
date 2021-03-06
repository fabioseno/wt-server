/*global module, require*/
module.exports = function (app) {
    'use strict';
    
    var authController = require('../controllers/auth');
    
    app.get('/login', authController.login);
    app.get('/myProfile', authController.myProfile);
    app.get('/logout', authController.logout);
    
};