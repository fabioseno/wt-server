/*global module, require*/

var MessageSystem   = require('../utils/messageSystem'),
    User            = require('../models/user');

module.exports.required = function (req, res, next) {
    'use strict';
    
    req.validations = req.validations || [];
    
    if (!req.body || !req.body.name) {
        req.validations.push('Campo nome é obrigatório!');
    }
    
    if (!req.body || !req.body.email) {
        req.validations.push('Campo e-mail é obrigatório!');
    }
    
    if (!req.body || !req.body.status) {
        req.validations.push('Campo status é obrigatório!');
    }
    
    next();
};

module.exports.emailExists = function (req, res, next) {
    'use strict';
    
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            MessageSystem.buildErrorResponse(err, res);
        }
        
        if (user && req.body.id && user.id !== req.body.id) {
            req.validations = req.validations || [];
            req.validations.push('Usuário com e-mail já cadastrado!');
        }
        
        next();
    });
};