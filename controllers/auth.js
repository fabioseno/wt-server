/*global require, console, module*/
var MessageSystem   = require('../utils/messageSystem'),
    Session         = require('../models/session'),
    User         = require('../models/user');

module.exports.login = function (req, res, next) {
    'use strict';
    
    console.log('login');
    
    User.findOne({ email: req.body.email, password: req.body.password }, '-password', function (err, user) {
        
        if (err) {
            MessageSystem.buildErrorResponse(err, res);
        }
        
        if (user) {
            Session.remove({ login: req.body.email }, function (err, sessions) {
                var session = new Session({ login: req.body.email, updateDate: new Date() });
                
                session.save(function (err, session) {
                    res.header('SessionId', session.id);
                    res.json(user);
                });
            });
        }
    });
};

module.exports.logout = function (req, res) {
    'use strict';
    
    req.logout();
    res.redirect('/');
};

module.exports.myProfile = function (req, res) {
    'use strict';
    
    if (req.user) {
        res.send(req.user.getUser());
    } else {
        res.send(401);
    }
};