/*global require, module*/
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status: String
}),
    User;

userSchema.methods = {
    
    validPassword: function (password, callback) {
        'use strict';
        
        return (this.password === password);
    },
    
    getUser: function () {
        'use strict';
        
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }
    
};

userSchema.virtual('id').get(function () {
    'use strict';
    
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('User', userSchema);