const mongoose = require('mongoose');
const { v4 } = require('uuid');

const messageSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  sender: {
    type: String,
  },
  content: {
    type: String,
    trime: true,
  },
  // chat: {
  //   type: String,
  //   ref: 'chat',
  // },
  created: {
    type: Date,
  },
  date: {
    type: String,
  },
});

const Messages = mongoose.model('Message', messageSchema);

module.exports = { Messages };
