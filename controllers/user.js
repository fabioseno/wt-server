/*global require, console, module*/
var MessageSystem   = require('../utils/messageSystem'),
    User            = require('../models/user');

module.exports.list = function (req, res) {
    'use strict';
    
    function paginate(model, req, callback) {
        model.count(req.body.filter, function (err, total) {
            var totalPages = Math.ceil(total / req.body.options.pageSize),
                pagination = {
                    page: {
                        totalItems: total,
                        totalPages: totalPages,
                        currentPage: req.body.options.currentPage
                    },
                    queryOptions:  {
                        sort: {name: 1},
                        skip: ((req.body.options.currentPage - 1) * totalPages),
                        limit: req.body.options.pageSize
                    }
                };
            
            callback(pagination);
        });
    }
    
    var page = paginate(User, req, function(pagination) {
        console.log(pagination.queryOptions);
        
        User.find({}, {}, pagination.queryOptions, function (err, users) {
            res.json(MessageSystem.processAction(err, users));
        });    
    });
}


module.exports.get = function (req, res) {
    'use strict';
    
    User.findById(req.params.id, function (err, user) {
        res.json(MessageSystem.processAction(err, user));
    });
};

module.exports.create = function (req, res) {
    'use strict';
    
    var user = new User(req.body);
    
    user.save(function (err, user) {
        res.json(MessageSystem.processAction(err, user));
    });
};

module.exports.save = function (req, res) {
    'use strict';
    
    User.findByIdAndUpdate(req.params.id, { name: req.body.name, status: req.body.status }, {}, function (err, user) {
        res.json(MessageSystem.processAction(err, user));
    });
};

module.exports.delete = function (req, res) {
    'use strict';
    
    User.findByIdAndRemove(req.params.id, function (err, user) {
        res.json(MessageSystem.processAction(err, user));
    });
};