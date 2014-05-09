/*global module, require*/
var MessageSystem   = require('../utils/messageSystem'),
    Session         = require('../models/session');

module.exports.isLoggedIn = function (req, res, next) {
    'use strict';
    
    if (req.path === '/login' || req.method === 'OPTIONS') {
        next();
    } else {
        Session.findById(req.get('SessionId'), function (err, session) {
            
            if (err) {
                MessageSystem.buildErrorResponse(err, res);
            }
            
            if (!session || (session && new Date().setHours(session.updateDate.getHours() + 3) < new Date())) {
                res.json(401, { type: 'error', messages: [] });
            } else {
                next();
            }
        });
    }
};