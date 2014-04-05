/*global require, module, console*/
module.exports = function (app) {
    'use strict';
    
    var userController  = require('../controllers/user'),
        userMiddleware  = require('../middlewares/user'),
        authenticationMiddleware = require('../middlewares/authentication');
    
    app.post('/users', userController.list);
    app.get('/user/:id', userController.get);
    app.post('/user', userMiddleware.required, userMiddleware.emailExists, userController.create);
    app.put('/user/:id', userMiddleware.required, userMiddleware.emailExists, userController.save);
    app.delete('/user/:id', userController.delete);
};