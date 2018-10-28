const Joi = require('joi');
const mongoose = require('mongoose');

const Lock = mongoose.model('Lock', new mongoose.Schema({
    status: {
      type: Boolean,
      required: true
    }
  }));

  function validateLock(lock) {
  const schema = {
      status: Joi.boolean()
  };

  return Joi.validate(lock, schema);
  }

  exports.Lock = Lock;
exports.validate = validateLock;
