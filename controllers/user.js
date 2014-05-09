/*global require, console, module*/
var MessageSystem   = require('../utils/messageSystem'),
    User            = require('../models/user'),
    Pagination      = require('../utils/pagination');

module.exports.list = function (req, res) {
    'use strict';
    
    Pagination.paginate(User, req, function (pagination) {
        User.find({}, {}, pagination.queryOptions, function (err, users) {
            pagination.page.list = users;
            
            res.json(MessageSystem.processAction(err, pagination.page));
        });
    });
};

module.exports.get = function (req, res) {
    'use strict';
    
    User.findById(req.params.id, function (err, user) {
        res.json(MessageSystem.processAction(err, user));
    });
};

module.exports.create = function (req, res) {
    'use strict';
    
    // validations
    if (req.validations && req.validations.length > 0) {
        MessageSystem.buildValidationResponse(req.validations, res);
    }
    
    var shaObj = new jsSHA(req.body.password, "TEXT"),
        hash = shaObj.getHMAC(req.body.email, "TEXT", "SHA-1", "B64");
    
    req.body.password = hash;
    
    var user = new User(req.body);
    
    user.save(function (err, user) {
        res.json(MessageSystem.processAction(err, user));
    });
};

module.exports.save = function (req, res) {
    'use strict';
    
    // validations
    if (req.validations && req.validations.length > 0) {
        MessageSystem.buildValidationResponse(req.validations, res);
    }
    
    User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email, status: req.body.status }, {}, function (err, user) {
        res.json(MessageSystem.processAction(err, user));
    });
};

module.exports.delete = function (req, res) {
    'use strict';
    
    User.findByIdAndRemove(req.params.id, function (err, user) {
        res.json(MessageSystem.processAction(err, user));
    });
};