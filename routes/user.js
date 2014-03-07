/*global require, module, console*/
module.exports = function (app) {
    'use strict';
    
    var userController  = require('../controllers/user');
    
    app.post('/users', userController.list);
    app.get('/user/:id', userController.get);
    app.post('/user', userController.create);
    app.put('/user/:id', userController.save);
    app.delete('/user/:id', userController.delete);
};