/*global require, module*/
var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    login: String,
    updateDate: Date
}),
    Session;

sessionSchema.virtual('id').get(function () {
    'use strict';
    
    return this._id.toHexString();
});

sessionSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Session', sessionSchema);