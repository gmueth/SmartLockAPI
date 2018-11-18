const Joi = require('joi');
const mongoose = require('mongoose');

const Event = mongoose.model('Event', new mongoose.Schema({
    lockid: mongoose.Types.ObjectId,
    userid: mongoose.Types.ObjectId,
    date: Date,
    status: Boolean
}));

function validateEvent(lock) {
  const schema = {
    lockid: Joi.objectId().required(),
    userid: Joi.objectId(),
    status: Joi.boolean().required()
  };

  return Joi.validate(lock, schema);
}

exports.Event = Event;
exports.validate = validateEvent;
