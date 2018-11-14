const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    locks: [mongoose.Schema.ObjectId]
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(), 
        password: Joi.string().min(5).max(255).required(),
        locks: Joi.array().items(Joi.objectId())
    };

    return Joi.validate(user, schema);
}

function validateLockAdd(user) {
    const schema = {
        lockID: Joi.objectId()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.validatePUT = validateLockAdd;