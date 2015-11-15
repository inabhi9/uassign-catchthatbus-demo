// grab the mongoose module
var mongoose = require('mongoose');
var validator = require('validator');
var Helper = require('../common/helper.js');

var KIND_ENUM = 'seller,buyer'.split(',');


var UserSchema = new mongoose.Schema({
    fullname: {type: String, required: true, trim: true},
    email: {
        type: String,
        validate: [validator.isEmail, 'Invalid email'],
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {type: String, required: true, trim: true},
    kind: {type: String, enum: KIND_ENUM, required: true, trim: true}
});

// Encrypt password
UserSchema.pre('save', function (next) {
    this.password = Helper.encryptPassword(this.password);

    next();
});


// Extra methods
UserSchema.methods.login = function (cb) {
    this.password = Helper.encryptPassword(this.password);
    var fields = Helper.prepareFields(UserSchema, ['password']);
    user.findOne({email: this.email, password: this.password, kind: this.kind}, fields, cb);
};

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var user = mongoose.model('User', UserSchema);

module.exports = user;
