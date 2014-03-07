/*global module, require*/
var errorBuilder = require('../utils/errorBuilder');

module.exports.processAction = function (err, data, req, res) {
    'use strict';
    
    console.log(err);
    if (err) {
        return errorBuilder.http(err);
    }
    
    if (!data) {
        return errorBuilder.http('Data not found');
    }
    
    return data;
};

module.exports.buildUnauthorizedResponse = function (req, res) {
    'use strict';
    
    return this.processAction(401);
};
