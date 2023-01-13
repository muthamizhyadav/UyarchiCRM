const mongoose = require('mongoose');
const { v4 } = require('uuid');

const SavedSearchSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  Title: {
    type: String,
  },
  location: {
    type: String,
  },
  houseType: {
    type: String,
  },
  propertyType: {
    type: String,
  },
  price: {
    type: Number,
  },
  furnishingStatus: {
    type: String,
  },
  parkingAvailability: {
    type: String,
  },
});
