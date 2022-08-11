const mongoose = require('mongoose');
const { v4 } = require('uuid');

const messageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    senderId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const messages = mongoose.model('Message', messageSchema);

module.exports = messages;
