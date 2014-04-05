/*global module*/
module.exports.all = function (req, res, next) {
    'use strict';
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, SessionId');
    res.header('Access-Control-Expose-Headers', 'SessionId');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    next();
};

module.exports.root = function (req, res) {
    'use strict';
    
    res.send('ok');
};