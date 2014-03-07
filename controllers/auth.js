/*global module, require*/
var passport = require('passport');

module.exports.login = function (req, res, next) {
    'use strict';
    
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        
        if (!user) {
            //req.logout();
            return res.send(401);
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            
            var result = {
                user: user,
                sessionId: 'abc'
            }
            
            return res.send(result);
        });
    })(req, res, next);
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