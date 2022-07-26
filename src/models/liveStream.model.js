const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { v4 } = require('uuid')
const { toJSON, paginate } = require('./plugins');

const liveStreamSchema = mongoose.Schema({
  _id: {
    type: String,
    default: v4
  },
  token: {
    type: String,

  },
  date: {
    type: String,
  },
  time: {
    type: Number,
  },
  expiry: {
    type: String,
  },
  userId: {
    type: String,
  },
  streaming: {
    type: String,
  },
  requirementId: {
    type: String
  },


});
const liveStream = mongoose.model('liveStream', liveStreamSchema);
module.exports = liveStream;