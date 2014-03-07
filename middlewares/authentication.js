/*global module*/
module.exports.isLoggedIn = function (req, res, next) {
    'use strict';
    
    if (!req.isAuthenticated()) {
        res.status = 401;
    }
    
    next();
};