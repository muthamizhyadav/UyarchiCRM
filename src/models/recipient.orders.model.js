const mongoose = require('mongoose');
const { v4 } = require('uuid');

const RecipentOrdersSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  RecipentId: {
    type: String,
  },
  hostId: {
    type: String,
  },
  orderedQty: {
    type: Number,
  },
  orderedPrice: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
});

const RecipentOrders = mongoose.model('recipientOrders', RecipentOrdersSchema);

module.exports = RecipentOrders;
