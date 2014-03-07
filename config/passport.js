/*global require, module*/
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

module.exports = function (passport) {
    'use strict';
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        User.findOne({ id: id }, function (err, user) {
            if (err) {
                done(err);
            }
            
            done(null, user);
        });
    });
    
    passport.use(new LocalStrategy({
        
        usernameField: 'email',
        passwordField: 'password'
        
    }, function (login, password, done) {
        User.findOne({email: login}, function (err, user) {
            if (err) {
                return done(err);
            }
            
            if (!user) {
                return done(null, false);
            }
            
            if (!user.validPassword(password)) {
                return done(null, false);
            }
            
            return done(null, user.getUser());
        });
    }));
};