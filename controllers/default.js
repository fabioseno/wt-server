/*global module*/
module.exports.all = function (req, res, next) {
    'use strict';
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    
    next();
};

module.exports.root = function (req, res) {
    'use strict';
    
    res.send('ok');
};