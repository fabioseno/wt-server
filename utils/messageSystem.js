/*global module, require*/
var errorBuilder = require('../utils/errorBuilder');

module.exports.processAction = function (err, data, req, res) {
    'use strict';
    
    if (err) {
        return errorBuilder.http(err);
    }
    
    if (!data) {
        return errorBuilder.http('Data not found');
    }
    
    return data;
};

module.exports.buildErrorResponse = function (err, res) {
    'use strict';
    
    res.json(500, errorBuilder.http(err));
};

module.exports.buildValidationResponse = function (messages, res) {
    'use strict';
    
    res.json(500, { type: 'warning', messages: messages });
};

module.exports.buildUnauthorizedResponse = function (req, res) {
    'use strict';
    
    return this.processAction(401);
};
